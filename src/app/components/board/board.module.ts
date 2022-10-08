import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ], exports: [
    BoardComponent
  ]
})
export class BoardModule { }
