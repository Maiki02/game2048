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
    this.generateRandom();
    console.log('BOARD:', this.game.board);
  }

  //Given a number that represents the number of rows and columns in the board,
  //create a board with its initial values set to 0.
  createBoard(numOfRows: number) {
    return ANY_BOARD;
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

  moveToDown() {}
  moveToUp() {}
  moveToLeft() {
    for(let i=0; i < this.game.numOfRows; i++){
      this.addLeftRow(this.game.board[i]);
    }
    this.generateRandom();
  }

  moveToRight() {
    for(let i=0; i < this.game.numOfRows; i++){
      this.addRightRow(this.game.board[i]);
    }
    this.generateRandom();
  }

  getFirstFreeColumnInRow(row: number[]) {
    return row.indexOf(0);
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

        if (row[i]!=0 && row[i] == row[i+1] ){
          row[i]= row[i] + row[i+1];
          row[i+1]=ANY_CELL;
        }
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

    while (haveSpace) {
      haveSpace = this.isHaveSpaceRight(row);
      for (let i = this.game.numOfCols; 0 < i; i--) {
        if (row[i] == 0) {
          aux = row[i];
          row[i] = row[i - 1];
          row[i - 1] = aux;
        }

        if (row[i]!=0 && row[i] == row[i-1] ){
          row[i]= row[i] + row[i-1];
          row[i-1]=ANY_CELL;
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
}
