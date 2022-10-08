import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  setBoard,
  setRestartGame,
  setScore,
} from 'src/app/redux/actions/game.action';
import { INITIAL_GAME_STATE } from 'src/app/shared/const/const';
import { LOCAL_STORAGE } from 'src/app/shared/const/localStorage';
import { appState } from 'src/app/shared/interfaces/appState.interface';
import { Game } from 'src/app/shared/interfaces/game.interface';
import { BoardComponent } from '../../board/board.component';

@Component({
  selector: 'app-modal-restart',
  templateUrl: './game-restart.component.html',
  styleUrls: ['./../modals.scss'],
})
export class GameRestartComponent implements OnInit {
  public game!: Game;

  constructor(private store: Store<appState>) {
    this.store.subscribe((state) => {
      this.game = state.game;
      console.log(this.game);
    });
  }

  ngOnInit(): void {}

  restartGame() {
    const board = new BoardComponent(this.store);
    board.createGame(this.game.numOfCols);
    this.store.dispatch(setBoard({ board: board.game.board }));
    this.store.dispatch(setScore({ score: 0 }));
    localStorage.removeItem(LOCAL_STORAGE.BACK_STATES);
    localStorage.removeItem(LOCAL_STORAGE.CURRENT_STATE);
    this.close();
  }

  cancelRestart() {
    this.close();
  }

  close() {
    this.store.dispatch(setRestartGame({ restartGame: false }));
  }
}
