import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setBoard, setRestartGame, setScore} from 'src/app/redux/actions/game.action';
import { LOCAL_STORAGE } from 'src/app/shared/const/localStorage';
import { appState } from 'src/app/shared/interfaces/appState.interface';
import { Game } from 'src/app/shared/interfaces/game.interface';
import { BoardComponent } from '../../board/board.component';
import { Modal } from '../modal';

@Component({
  selector: 'app-modal-restart',
  templateUrl: './game-restart.component.html',
  styleUrls: ['./../modals.scss'],
})
export class GameRestartComponent extends Modal {
  public game!: Game;

  constructor(private store: Store<appState>) {
    super();
    this.store.subscribe((state) => {
      this.game = state.game;
      this.wasInside=state.game.isRestart;
    });
  }

  restartGame() {
    const board = new BoardComponent(this.store);
    board.createGame(this.game.numOfCols);
    this.store.dispatch(setBoard({ board: board.game.board }));
    this.store.dispatch(setScore({ score: 0 }));
    localStorage.removeItem(LOCAL_STORAGE.BACK_STATES);
    localStorage.removeItem(LOCAL_STORAGE.CURRENT_STATE);
    this.close();
  }

  override close() {
    this.store.dispatch(setRestartGame({ restartGame: false }));
  }

  override getIsOpenWithButton(){
    return this.count>1;
  }
}
