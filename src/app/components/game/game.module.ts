import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { BoardModule } from '../board/board.module';
import { ActionsModule } from '../actions/actions.module';
import { GameRestartModule } from '../modals/game-restart/game-restart.module';
import { GameFinishedModule } from '../modals/game-finished/game-finished.module';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,

    BoardModule,
    ActionsModule,

    //Modals
    GameRestartModule,
    GameFinishedModule
  ], exports: [
    GameComponent
  ]
})
export class GameModule { }
