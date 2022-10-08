import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setBoard, setRecord, setScore } from 'src/app/redux/actions/game.action';
import { ANY_BOARD } from 'src/app/shared/const/const';
import { LOCAL_STORAGE } from 'src/app/shared/const/localStorage';
import { appState } from 'src/app/shared/interfaces/appState.interface';
import { Game } from 'src/app/shared/interfaces/game.interface';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() game!: Game;

  constructor(private store:Store<appState>) { 
    this.store.subscribe(state=>{
      this.game=state.game;
    })
  }

  ngOnInit(): void {
    this.rememberRecordInLocalStorage();
  }

  restartGame(){
    const board= new BoardComponent(this.store);
    board.createGame(this.game.numOfCols);
    this.store.dispatch(setBoard({board:board.game.board}));
    this.store.dispatch(setScore({score:0}));
  }

  goBack(){

  }

  getScore():number{
    return this.game.score;
  }

  getRecord():number{
    if(this.game.score>this.game.record){
      this.store.dispatch(setRecord({record:this.game.score}));
      this.setRecordInLocalStorage(this.game.score);
      return this.getScore();
    } else {
      return this.game.record;
    }
  }

  setRecordInLocalStorage(value:number){
    localStorage.setItem(LOCAL_STORAGE.RECORD, JSON.stringify(value));
  }

  rememberRecordInLocalStorage(){
    const recordStr=localStorage.getItem(LOCAL_STORAGE.RECORD);
    if(recordStr){
      const parseValue=JSON.parse(recordStr);
      this.store.dispatch(setRecord({record:parseValue}));
    } else {
      this.store.dispatch(setRecord({record:0}));
    }
  }
}
