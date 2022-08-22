import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { timer, Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit ,OnChanges,OnDestroy {
  @Input() player:Player|undefined;
  @Output() onClickRestart = new EventEmitter<Player>();
  @Output() onClickDrinkElixir = new EventEmitter<Player>();
  @Input() isOwner:boolean=false;
  timerSub: Subscription|undefined=undefined;
  countDown: number=0;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.player){
      if(this.isOwner&&changes.player.currentValue.canDrinkElixir
        &&changes.player.currentValue.canDrinkElixir!=changes.player.previousValue.canDrinkElixir
        ){
        this.startTimer(10)
      }
    }
  }

  ngOnInit(): void {
    
  }
  restart(){
    this.onClickRestart.emit(this.player);
  }
  drinkElixir(){
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
    this.onClickDrinkElixir.emit(this.player);
  }
  public startTimer(startValue:number) {

    this.timerSub = timer(0, 1000).pipe(
      take(startValue + 1),
      map(value => startValue - value)
    ).subscribe(
      value => this.countDown = value, 
      null, 
      () =>{
        if(this.timerSub){
          this.timerSub = undefined
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }
}
