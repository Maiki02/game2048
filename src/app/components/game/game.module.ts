import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule
  ], exports: [
    GameComponent
  ]
})
export class GameModule { }
