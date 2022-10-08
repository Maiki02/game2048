import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/shared/interfaces/appState.interface';
import { Game } from 'src/app/shared/interfaces/game.interface';

@Component({
  selector: 'app-modal-finished',
  templateUrl: './game-finished.component.html',
  styleUrls: ['./../modals.scss']
})
export class GameFinishedComponent implements OnInit {
  public game!:Game;

  constructor(private store:Store<appState>) {
    this.store.subscribe(state=>{
      this.game=state.game;
    });
  }

  ngOnInit(): void {
  }

}
