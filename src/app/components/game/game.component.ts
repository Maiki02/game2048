import { Component, OnInit } from '@angular/core';
import { withLatestFrom } from 'rxjs';
import { Stats } from 'src/app/shared/interfaces/board.interface';
const ANY_ROW=[0,0,0,0]
const BOARD_INITIAL=[ANY_ROW,ANY_ROW,ANY_ROW,ANY_ROW];
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private row=[0,0,0,0];
  public stats:Stats={
    board:[],
    numOfCols:0,
    numOfRows:0,
    score:0
  };
  constructor() { 
    console.log("CREANDO GAME");
    this.createBoard(2);
  }

  ngOnInit(): void {
  }

  createGame(numOfRows:number){
    this.stats.numOfCols=numOfRows;
    this.stats.numOfRows=numOfRows;
    //this.board
  }

  //Given a number that represents the number of rows and columns in the board, 
  //create a board with its initial values set to 0.
  createBoard(numOfRows:number){
  }

  moveToDown(){
    
  }
  moveToUp(){}
  moveToLeft(){}
  moveToRight(){
    /*console.log("MOVE TO RIGHT")
    let boardFinally= BOARD_INITIAL;
    this.board.forEach(row=>{
      console.log(row);
      if(){

      }
    })*/
  }

  generateRandom(){

  }

}
