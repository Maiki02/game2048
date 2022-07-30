import { Component, OnInit } from '@angular/core';
import { withLatestFrom } from 'rxjs';
import { Game, Position } from 'src/app/shared/interfaces/game.interface';
const ANY_CELL = 0;
const ANY_ROW = [ANY_CELL, ANY_CELL, ANY_CELL, ANY_CELL];
const BOARD_INITIAL = [ANY_ROW, ANY_ROW, ANY_ROW, ANY_ROW];
const BOARD_COMPLETE = [
  [0, 2, 3, 4],
  [0, 6, 7, 8],
  [0, 10, 11, 12],
  [0, 14, 15, 16],
];
const BOARD_TESTING=[
  [2, 2, 2, 2],
  [4, 2, 2, 0],
  [4, 4, 0, 0],
  [4, 0, 4, 0],
]
const ANY_BOARD = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  private row = [0, 0, 0, 0];
  public game: Game = {
    board: [],
    numOfCols: 0,
    numOfRows: 0,
    score: 0,
  };
  constructor() {
    console.log('CREANDO GAME');
    this.createGame(4);
  }

  ngOnInit(): void {}

  createGame(numOfRows: number) {
    this.game.numOfCols = numOfRows;
    this.game.numOfRows = numOfRows;
    this.game.board = this.createBoard(numOfRows);
    //this.generateRandom();
    console.log('BOARD:', this.game.board);
  }

  //Given a number that represents the number of rows and columns in the board,
  //create a board with its initial values set to 0.
  createBoard(numOfRows: number) {
    //return ANY_BOARD;
    return BOARD_TESTING
  }

  generateRandom() {
    const freePositions = this.getFreePositions();
    const randomPosition = Math.floor(Math.random() * freePositions.length);
    const position = freePositions[randomPosition];
    this.game.board[position.X][position.Y] = 2;
  }

  getFreePositions() {
    const arrayOfPositions: Position[] = [];
    const cantRows: number = this.game.numOfRows;
    const cantColumns: number = this.game.numOfCols;

    for (let i = 0; i < cantRows; i++) {
      for (let j = 0; j < cantColumns; j++) {
        if (this.game.board[i][j] == ANY_CELL) {
          arrayOfPositions.push({
            X: i,
            Y: j,
          });
        }
      }
    }
    return arrayOfPositions;
  }

  moveToDown() {
    if(this.canMoveToDown()){
      for(let i=0; i < this.game.numOfRows; i++){
        let newColumn=this.getColumn(i)
        this.addRightRow(newColumn);
        this.setColumn(newColumn, i);
      }
      this.generateRandom();
    }
  }

  moveToUp() {
    if(this.canMoveToUp()){
      for(let i=0; i < this.game.numOfRows; i++){
        let newColumn=this.getColumn(i)
        this.addLeftRow(newColumn);
        this.setColumn(newColumn, i);
      }
      this.generateRandom();
    }
  }

  moveToLeft() {
    if(this.canMoveToLeft()){
      for(let i=0; i < this.game.numOfRows; i++){
        this.addLeftRow(this.game.board[i]);
      }
      this.generateRandom();
    }
  }

  moveToRight() {
    if(this.canMoveToRight()){
      for(let i=0; i < this.game.numOfRows; i++){
        this.addRightRow(this.game.board[i]);
      }
      this.generateRandom();
    }
  }
  canMoveToRight():boolean {
    try{
      for(let i=0; i < this.game.numOfRows; i++){
        if(this.canMoveRowToRight(this.game.board[i])) throw new Error();
      }
      return false;
    } catch(error){
      return true;
    }
  }

  canMoveToLeft():boolean {
    try{
      for(let i=0; i < this.game.numOfRows; i++){
        if(this.canMoveRowToLeft(this.game.board[i])) throw new Error();
      }
      return false;
    } catch(error){
      return true;
    }
  }

  canMoveToDown():boolean {
    try{
      for(let i=0; i < this.game.numOfCols; i++){
        let newColumn=this.getColumn(i)
        if(this.canMoveRowToRight(newColumn)) throw new Error();
      }
      return false;
    } catch(error){
      return true;
    }
  }

  canMoveToUp():boolean {
    try{
      for(let i=0; i < this.game.numOfCols; i++){
        let newColumn=this.getColumn(i);
        console.log(newColumn)
        if(this.canMoveRowToLeft(newColumn)) throw new Error();
      }
      return false;
    } catch(error){
      return true;
    }
  }

  haveTwoSameConsecutives(row:number[]){
    try{
      for (let i = 0; i < this.game.numOfCols - 1; i++) {
        if (row[i]!=0 && row[i] == row[i+1] ) throw new Error()
      }
      return false;
    } catch(error){
      return true;
    }
  }

  addLeftRow(row: number[]) {
    let aux;
    let haveSpace = true;
    while (haveSpace) {
      haveSpace = this.isHaveSpaceLeft(row);
      for (let i = 0; i < this.game.numOfCols - 1; i++) {
        if (row[i] == 0) {
          aux = row[i];
          row[i] = row[i + 1];
          row[i + 1] = aux;
        }

        
      haveSpace = this.isHaveSpaceLeft(row);
        if(row[0]!=0) console.log(row);
      }
    }
    

  }

  isHaveSpaceLeft(row: number[]): boolean {
    try {
      for (let i = 0; i < this.game.numOfCols - 1; i++) {
        if (row[i] == 0 && row[i + 1] != 0) throw new Error();
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  addRightRow(row: number[]) {
    let aux;
    let haveSpace = true;
    let quantAdd= 0;

    while (haveSpace && quantAdd < 2) {
      haveSpace = this.canMoveRowToRight(row);
      for (let i = this.game.numOfCols; 0 < i; i--) {
        if (row[i] == 0) {
          aux = row[i];
          row[i] = row[i - 1];
          row[i - 1] = aux;
        }

        if (row[i]!=0 && row[i] == row[i-1] ){
          row[i]= row[i] + row[i-1];
          row[i-1]=ANY_CELL;
          quantAdd++;
        }
      }
    }
  }

  isHaveSpaceRight(row: number[]): boolean {
    try {
      for (let i = this.game.numOfCols; 0 < i; i--) {
        if (row[i] == 0 && row[i - 1] != 0) throw new Error();
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  getColumn(indexCol: number){
    let columnToReturn:number[]=ANY_ROW;
    for (let i = 0; i < this.game.numOfCols; i++) {
      columnToReturn[i]=this.game.board[i][indexCol]
    }
    return columnToReturn;
  }

  setColumn(column:number[], indexCol:number){
    for (let i = 0; i < this.game.numOfCols; i++) {
      this.game.board[i][indexCol]=column[i]
    }
  }

  canMoveRowToLeft(row:number[]){
    return this.isHaveSpaceLeft(row) || this.haveTwoSameConsecutives(row)
  }
  canMoveRowToRight(row:number[]){
    return this.isHaveSpaceRight(row) || this.haveTwoSameConsecutives(row)
  }
}
