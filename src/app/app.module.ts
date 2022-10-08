import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModule } from './components/game/game.module';
import { StoreModule } from '@ngrx/store';
import { gameReducer } from './redux/reducers/game.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GameModule,
    StoreModule.forRoot({
      game: gameReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
