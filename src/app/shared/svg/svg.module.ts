import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackArrowComponent } from './back-arrow/back-arrow.component';
import { ResetArrowComponent } from './reset-arrow/reset-arrow.component';
import { MedalComponent } from './medal/medal.component';
import { ScoreComponent } from './score/score.component';
import { GearComponent } from './gear/gear.component';



@NgModule({
  declarations: [
    BackArrowComponent,
    ResetArrowComponent,
    MedalComponent,
    ScoreComponent,
    GearComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    BackArrowComponent,
    ResetArrowComponent,
    MedalComponent,
    ScoreComponent,
    GearComponent
  ]
})
export class SvgModule { }
