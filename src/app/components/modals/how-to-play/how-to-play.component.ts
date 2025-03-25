import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setFinished, setShowHowToPlay } from 'src/app/redux/actions/game.action';
import { appState } from 'src/app/shared/interfaces/appState.interface';
import { Game } from 'src/app/shared/interfaces/game.interface';
import { Modal } from '../modal';

@Component({
  selector: 'app-modal-how-to-play',
  templateUrl: './how-to-play.component.html',
  styleUrls: ['./../modals.scss']
})
export class HowToPlayModalComponent extends Modal {

  public game!: Game;

  constructor(private store: Store<appState>) {
    super();
    this.store.select('game', 'isShowHowToPlay').subscribe((isShowHowToPlay) => {
      this.wasInside = isShowHowToPlay;
    });
  }

  override close(){
    this.store.dispatch(setShowHowToPlay({isShowHowToPlay:false}));
  }

  override getIsOpenWithButton(){
    return this.count>1;
  }
}
