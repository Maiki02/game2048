import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setBoard, setGameStatus, setRecord, setScore } from 'src/app/redux/actions/game.action';
import { INITIAL_GAME_STATE } from 'src/app/shared/const/const';
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
  public game: Game= INITIAL_GAME_STATE;

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
    let backStates:string | null=localStorage.getItem(LOCAL_STORAGE.BACK_STATES);
    if(backStates){
      const parseValue:Game[]=JSON.parse(backStates);
      if(parseValue.length>0){
        const lastState=parseValue[parseValue.length-1];
        this.store.dispatch(setGameStatus({state: lastState}));

        if(parseValue.length>1){
          parseValue.pop();
          localStorage.setItem(LOCAL_STORAGE.BACK_STATES, JSON.stringify(parseValue));
        } else {
          localStorage.removeItem(LOCAL_STORAGE.BACK_STATES);
        }
      }
    }
  }

  isBackDisabled(){
    let backStates:string | null=localStorage.getItem(LOCAL_STORAGE.BACK_STATES);
    if(backStates){
      const parseValue:Game[]=JSON.parse(backStates);
      if(parseValue.length>0){
        return false;
      }
    }
    return true;
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
