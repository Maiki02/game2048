import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ], exports: [
    GameComponent
  ]
})
export class GameModule { }
