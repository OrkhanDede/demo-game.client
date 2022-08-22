import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerStatus } from '../../enums/PlayerStatus';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-play-ground',
  templateUrl: './play-ground.component.html',
  styleUrls: ['./play-ground.component.scss']
})
export class PlayGroundComponent implements OnInit {

  @Input() players:Array<Player>=[];
  @Input() player:Player|undefined;
  @Output() onLeftClick = new EventEmitter<boolean>();
  @Output() onShutClick = new EventEmitter<Player>();
  @Output() onClickPlayerRestart = new EventEmitter<Player>();
  @Output() onClickPlayerDrinkElixir = new EventEmitter<Player>();
  constructor() { }

  ngOnInit(): void {
     //this.testPlayers();
     console.log(this.players)
  }
  leftClick(){
    console.log("asdasdsa")
    this.onLeftClick.emit(true);
  }
  
  onClickPlayer(player:Player){
    console.log("player clicked",player);
    if(player.status==PlayerStatus.GameOver){
      return;
    }
    this.onShutClick.emit(player);
  }
  restart(player:Player){
    console.log(player);
      this.onClickPlayerRestart.emit(player);
  }
  dirinkElixir(player:Player){
    console.log("dirinkElixir",player)
    this.onClickPlayerDrinkElixir.emit(player);
  }
}
