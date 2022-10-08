import { Component, Input, OnInit } from '@angular/core';
import { ANY_BOARD } from 'src/app/shared/const/const';
import { LOCAL_STORAGE } from 'src/app/shared/const/localStorage';
import { Game } from 'src/app/shared/interfaces/game.interface';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() game!: Game;

  constructor() { }

  ngOnInit(): void {
    this.rememberRecordInLocalStorage();
  }

  restartGame(){
    this.game.board=ANY_BOARD;
    this.game.score=0;
  }

  back(){

  }

  getScore():number{
    return this.game.score;
  }

  getRecord():number{
    if(this.game.score>this.game.record){
      this.game.record=this.game.score;
      this.setRecordInLocalStorage(this.game.record)
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
      this.game.record=parseValue;
    } else {
      this.game.record=0;
    }
  }
}
