import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlayerStatus } from './enums/PlayerStatus';
import { Player } from './interfaces/player';
import { HubService } from './services/hub.service';

@Component({
  selector: 'app-demo-game',
  templateUrl: './demo-game.component.html',
  styleUrls: ['./demo-game.component.scss']
})
export class DemoGameComponent implements OnInit {
  joinedGame:boolean=false;
  myForm = new FormGroup({
    username: new FormControl('john', [Validators.required]),
  });
  players:Array<Player>=[];
  player:Player|undefined;
  constructor(private hubService: HubService) { }
 
  ngOnInit(): void {
    this.hubService.startConnection();
    this.initEvents();
  }
  initEvents(){
    this.hubService.hubConnection?.on("States",(data)=>{
      let pls=data.players as Array<Player>;
      console.log("pls",pls);
      this.players=pls.filter(x=>x.username!=this.player?.username);

      console.log("Players:",this.players);
    })
    this.hubService.hubConnection?.on("PlayerJoined",(data)=>{
      console.log("PlayerJoined:",data);
      if(this.player?.username!=data.player.username){
        this.players.push(data.player)
        console.log(this.players);
      }else{
        this.player=data.player;
      }
    
    })
    this.hubService.hubConnection?.on("PlayerLefted",(data)=>{
      
      this.players = this.players.filter(item => item.username !== data);
    })
    this.hubService.hubConnection?.on('ChangedPlayerState',(data)=>{
      console.log("changed state:",data);
      if(this.player?.username!=data.state.username){

        this.players = this.players.map(object => {
          if (object.username === data.state.username) {
            
            return {...data.state};
          }
          return object;
        });
      }else{
        this.player=data.state;
      }
    })
  
  
  }
  joinGame(){
    let { username } = this.myForm.value;
    if (!this.myForm.valid) {
      return;
    }
    username = username?.replace(/\s/g, '');

    this.joinRequest(username);

  }
  shut(player:Player){
    var p=this.players.find(x=>x.username==player.username);
    if(p){
      this.hubService.hubConnection?.invoke("shut",p.username);
    }
  }
  leftClick(){
    console.log("left clicked");
    this.hubService.hubConnection?.invoke("left").then(()=>{
this.joinedGame=false;
    })
  }

  restart(player:Player){
    this.hubService.hubConnection?.invoke("rejoin");
    //this.players = this.players.filter(item => item.username !== player.username);
  }

  joinRequest(username:string){
    this.player={
      username:username,
      life:10,
      point:0,
      status:PlayerStatus.OnGame,
      canDrinkElixir:false
    };
    this.hubService.hubConnection?.invoke("join",username).then(()=>{
      this.hubService.hubConnection?.invoke("GetGameState").then(()=>{
        setTimeout(()=>{
          this.joinedGame=true;
        },200)
      })
    })
  }
  drinkElixir(){
    console.log("drinkelixir")
    this.hubService.hubConnection?.invoke("drinkelixir").then(()=>{
      
          })
  }

}
