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
import { GameWinModule } from '../modals/game-win/game-win.module';
import { HowToPlayModule } from '../how-to-play/how-to-play.module';



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
    HowToPlayModule,

    //Modals
    GameRestartModule,
    GameFinishedModule,
    GameWinModule,
  ], exports: [
    GameComponent
  ]
})
export class GameModule { }
