import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumToStringPipe } from './num-to-string.pipe';



@NgModule({
  declarations: [
    NumToStringPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumToStringPipe
  ]
})
export class PipesModule { }
