import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setFinished } from 'src/app/redux/actions/game.action';
import { appState } from 'src/app/shared/interfaces/appState.interface';
import { Game } from 'src/app/shared/interfaces/game.interface';
import { Modal } from '../modal';

@Component({
  selector: 'app-modal-finished',
  templateUrl: './game-finished.component.html',
  styleUrls: ['./../modals.scss']
})
export class GameFinishedComponent extends Modal {
  public game!:Game;

  constructor(private store:Store<appState>) {
    super();
    this.store.subscribe(state=>{
      this.game=state.game;
      this.wasInside=state.game.isFinished;
    });
  }

  override close(){
    this.store.dispatch(setFinished({isFinished:false}));
  }

}
