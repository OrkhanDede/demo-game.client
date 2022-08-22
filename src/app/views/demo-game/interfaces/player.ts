import { PlayerStatus } from "../enums/PlayerStatus";

export interface Player{
    username:string,
    point:number,
    life:number,
    status:PlayerStatus,
    canDrinkElixir:boolean
}