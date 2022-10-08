import { Component, OnInit } from '@angular/core';
import { ANY_BOARD, ANY_CELL, ANY_ROW, BOARD_TESTING } from 'src/app/shared/const/const';
import { Game, Position } from 'src/app/shared/interfaces/game.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public game: Game = {
    board: [],
    numOfCols: 0,
    numOfRows: 0,
    score: 0,
    record: 0,
    isFinished:false
  };
  constructor() {
    this.createGame(4);
  }

  ngOnInit(): void {}

  createGame(numOfRows: number) {
    this.game.numOfCols = numOfRows;
    this.game.numOfRows = numOfRows;
    this.game.board = this.createBoard(numOfRows);
    this.generateRandom();
    this.generateRandom();
  }

  //Given a number that represents the number of rows and columns in the board,
  //create a board with its initial values set to 0.
  createBoard(numOfRows: number) {
    return ANY_BOARD;
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

  moveTo(direction:string){
    switch(direction){
      case 'up': this.moveToUp(); break;
      case 'down': this.moveToDown();break;
      case 'left': this.moveToLeft();break;
      case 'right': this.moveToRight();break;
      default: ;break;
    }
    this.generateRandom();
  }

  moveToDown() {
    if(this.canMoveToDown()){
      for(let i=0; i < this.game.numOfRows; i++){
        let newColumn=this.getColumn(i)
        newColumn=this.addRightRow(newColumn);
        this.setColumn(newColumn, i);
      }
      this.generateRandom();
      this.game.isFinished=this.canMove();

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
      this.game.isFinished=this.canMove();

    }
  }

  moveToLeft() {
    if(this.canMoveToLeft()){
      for(let i=0; i < this.game.numOfRows; i++){
        this.addLeftRow(this.game.board[i]);
      }
      this.generateRandom();
      this.game.isFinished=this.canMove();

    }
  }

  moveToRight() {
    if(this.canMoveToRight()){
      for(let i=0; i < this.game.numOfRows; i++){
        this.game.board[i]= this.addRightRow(this.game.board[i]);
      }
      this.generateRandom();
      this.game.isFinished=this.canMove();
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

  /* Verifica si existe un movimiento en cualquiera de los 4 sentidos */
  canMove():boolean{
    return !this.canMoveToUp() && !this.canMoveToLeft() && !this.canMoveToRight() && !this.canMoveToDown();
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

  //Recrear movimiento a la izquierda en 2048
  addLeftRow(row: number[]) {
    this.quitarCeros(row);
    this.sumarDosElementosIguales(row);
    this.quitarCeros(row);
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
    let rowAux=this.invertirArray(row);
    this.addLeftRow(rowAux);
    return this.invertirArray(rowAux)
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

  /*Dado un array de numeros, recorre cada elemento y si uno es 0, lo reemplaza por el siguiente.
  Hasta que no haya mas 0s*/
  quitarCeros(row: number[]) {
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
      }
    }
  }

  /*Dado un array de numeros, recorre cada elemento y si el elemento es igual al siguiente (controlando que no se salga del arreglo),
  los suma, y el siguiente lo pone en 0. */
  sumarDosElementosIguales(row: number[]) {
    let haveSpace = true;
    while (haveSpace) {
      haveSpace = this.isHaveSpaceLeft(row);
      for (let i = 0; i < this.game.numOfCols - 1; i++) {
        if (row[i] == row[i + 1]) {
          row[i] = row[i] + row[i + 1];
          row[i + 1] = ANY_CELL;
          this.game.score+=row[i];
          i++;
        }
      }
    }
  }

  /*Dado un array de numeros, lo retorna al revés*/
  invertirArray(row: number[]) {
    let aux;
    let copyRow=JSON.parse(JSON.stringify(row));
    let arrayToReturn=[];
    const quantItems=copyRow.length;
    for (let i = quantItems-1; i >= 0; i--) {
      arrayToReturn.push(copyRow[i]);
    }
    return arrayToReturn;
  }

}
