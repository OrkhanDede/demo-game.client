import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoGameComponent } from './demo-game.component';

import { DemoGameRoutingModule } from './demo-game-routing.module';
import { PlayerComponent } from './components/player/player.component';
import { PlayGroundComponent } from './components/play-ground/play-ground.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TimeRemainingPipe } from './pipes/time-remaining.pipe';

@NgModule({
  declarations: [
    DemoGameComponent,
    PlayerComponent,
    PlayGroundComponent,
    TimeRemainingPipe
  ],
  imports: [
    CommonModule,
    DemoGameRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class DemoGameModule { }
