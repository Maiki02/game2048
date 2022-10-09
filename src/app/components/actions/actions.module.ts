import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions.component';
import { SvgModule } from 'src/app/shared/svg/svg.module';



@NgModule({
  declarations: [
    ActionsComponent
  ],
  imports: [
    CommonModule,
    SvgModule
  ], exports: [
    ActionsComponent
  ]
})
export class ActionsModule { }
