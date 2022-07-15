import { Component, OnInit } from '@angular/core';
import { withLatestFrom } from 'rxjs';
import { Game, Position } from 'src/app/shared/interfaces/game.interface';
const ANY_CELL=0
const ANY_ROW=[ANY_CELL,ANY_CELL,ANY_CELL,ANY_CELL]
const BOARD_INITIAL=[ANY_ROW,ANY_ROW,ANY_ROW,ANY_ROW];
const BOARD_COMPLETE=[[0,2,3,4],[0,6,7,8],[0,10,11,12],[0,14,15,16]]
const ANY_BOARD=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private row=[0,0,0,0];
  public game:Game={
    board:[],
    numOfCols:0,
    numOfRows:0,
    score:0
  };
  constructor() { 
    console.log("CREANDO GAME");
    this.createGame(4);

  }

  ngOnInit(): void {

  }

  createGame(numOfRows:number){
    this.game.numOfCols=numOfRows;
    this.game.numOfRows=numOfRows;
    this.game.board=this.createBoard(numOfRows);
    console.log("BOARD:", this.game.board);
  }

  //Given a number that represents the number of rows and columns in the board, 
  //create a board with its initial values set to 0.
  createBoard(numOfRows:number){
    return ANY_BOARD;
  }

  generateRandom(){
    const freePositions=this.getFreePositions()
    const randomPosition= Math.floor(Math.random() * (freePositions.length) );
    const position= freePositions[randomPosition];
    this.game.board[position.X][position.Y]=2
  }

  getFreePositions(){
    const arrayOfPositions: Position[]=[];
    const cantRows: number = this.game.numOfRows;
    const cantColumns: number=this.game.numOfCols;

    for(let i=0; i<cantRows; i++){
      for(let j=0; j<cantColumns; j++){
        if(this.game.board[i][j]==ANY_CELL){
          arrayOfPositions.push({
            X: i,
            Y: j,
          })
        }
      }
    }
    return arrayOfPositions;
  }

  moveToDown(){
    
  }
  moveToUp(){}
  moveToLeft(){
    console.log("MOVE TO LEFT")
    let boardFinally= ANY_BOARD;
    for(let i=0; i<this.game.numOfRows;i++){
      let row=this.game.board[i];
      let cols=this.game.numOfCols - 1; //Parsing the last with the next doesn't make sense.
      
      for(let j=0; j<cols;i++){
        if(row[j] == row[j+1] && row[j]!=0){
          row[j]= row[j+1]*2;
          row[j+1]=0;
        }
      }
    }

    this.generateRandom();
  }
  moveToRight(){
    
    console.log("MOVE TO RIGHT")
    let boardFinally= ANY_BOARD;
    this.game.board.forEach(row=>{
      console.log(row);
      /*if(){

      }*/
    })

    this.generateRandom();
  }

  getFirstFreeColumnInRow(row: number[]){
    return row.indexOf(0);
  }

}
