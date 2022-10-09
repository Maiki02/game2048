import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setWinner } from 'src/app/redux/actions/game.action';
import { appState } from 'src/app/shared/interfaces/appState.interface';
import { Game } from 'src/app/shared/interfaces/game.interface';
import { Modal } from '../modal';

@Component({
  selector: 'app-modal-win',
  templateUrl: './game-win.component.html',
  styleUrls: ['./../modals.scss'],
})
export class GameWinComponent extends Modal {
  public game!:Game;

  constructor(private store:Store<appState>) {
    super();
    this.store.subscribe(state=>{
      this.game=state.game;
      this.wasInside=state.game.isWinner==1;
    });
  }

  override close(){
    this.store.dispatch(setWinner({isWinner: this.game.isWinner+1}));
  }

}
