import { HostListener, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  setBoard,
  setFinished,
  setGameStatus,
  setScore,
} from 'src/app/redux/actions/game.action';
import {
  ANY_BOARD,
  ANY_CELL,
  ANY_ROW,
  BOARD_TESTING,
} from 'src/app/shared/const/const';
import { LOCAL_STORAGE } from 'src/app/shared/const/localStorage';
import { appState } from 'src/app/shared/interfaces/appState.interface';
import { Game, Position } from 'src/app/shared/interfaces/game.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public game: Game = {
    board: [],
    numOfCols: 0,
    numOfRows: 0,
    score: 0,
    record: 0,
    isFinished: false,
  };
  constructor(private store: Store<appState>) {
    this.store.subscribe((state) => {
      this.game = state.game;
    });
  }

  ngOnInit(): void {
    const backState= this.getSaveState();
    if(backState){
      this.store.dispatch(setGameStatus({state: backState}));
    } else {
      this.createGame(4);
    }
  }

  createGame(numOfRows: number) {
    let newGame: Game = JSON.parse(JSON.stringify(this.game));
    newGame.numOfCols = numOfRows;
    newGame.numOfRows = numOfRows;
    newGame.board = this.createBoard(numOfRows);

    this.store.dispatch(setGameStatus({ state: newGame }));

    this.generateRandom();
    this.generateRandom();
  }

  //Given a number that represents the number of rows and columns in the board,
  //create a board with its initial values set to 0.
  createBoard(numOfRows: number) {
    return ANY_BOARD;
    return BOARD_TESTING;
  }

  generateRandom() {
    console.log(this.game.board);
    const freePositions = this.getFreePositions();
    const randomPosition = Math.floor(Math.random() * freePositions.length);
    const position = freePositions[randomPosition];
    const valueToSet = Math.random() > 0.04 ? 2 : 4;
    let newBoard: any[] = JSON.parse(JSON.stringify(this.game.board));
    newBoard[position.X][position.Y] = valueToSet;

    this.store.dispatch(setBoard({ board: newBoard }));
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


  //------------------ MOVE TO ------------------//

  moveTo(direction: string) {
    let isMove: boolean = false;
    let backState: Game = JSON.parse(JSON.stringify(this.game));
    if (direction == 'up' && this.canMoveToUp()) {
      this.moveToUp();
      isMove = true;
    } else if (direction == 'down' && this.canMoveToDown()) {
      this.moveToDown();
      isMove = true;
    } else if (direction == 'left' && this.canMoveToLeft()) {
      this.moveToLeft();
      isMove = true;
    } else if (direction == 'right' && this.canMoveToRight()) {
      this.moveToRight();
      isMove = true;
    }

    if (isMove) {
      this.generateRandom();
      this.saveState(this.game);
      this.store.dispatch(setFinished({ isFinished: this.canMove() }));
      this.saveBackState(backState);
    }
  }

  moveToDown() {
    if (this.canMoveToDown()) {
      for (let i = 0; i < this.game.numOfRows; i++) {
        let newColumn = this.getColumn(i);
        newColumn = this.addRightRow(newColumn);
        this.setColumn(newColumn, i);
      }
    }
  }

  moveToUp() {
    if (this.canMoveToUp()) {
      for (let i = 0; i < this.game.numOfRows; i++) {
        let newColumn = this.getColumn(i);
        newColumn = this.addLeftRow(newColumn);
        this.setColumn(newColumn, i);
      }
    }
  }

  moveToLeft() {
    if (this.canMoveToLeft()) {
      for (let i = 0; i < this.game.numOfRows; i++) {
        this.setRow(this.addLeftRow(this.game.board[i]), i);
      }
    }
  }

  moveToRight() {
    if (this.canMoveToRight()) {
      for (let i = 0; i < this.game.numOfRows; i++) {
        this.setRow(this.addRightRow(this.game.board[i]), i);
      }
    }
  }

  //----------------------------------------------//

  // ------------------ CAN MOVE TO ------------------//
  
  /* Verifica si existe un movimiento en cualquiera de los 4 sentidos */
  canMove(): boolean {
    return (
      !this.canMoveToUp() &&
      !this.canMoveToLeft() &&
      !this.canMoveToRight() &&
      !this.canMoveToDown()
    );
  }

  canMoveToRight(): boolean {
    try {
      for (let i = 0; i < this.game.numOfRows; i++) {
        if (this.canMoveRowToRight(this.game.board[i])) throw new Error();
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  canMoveToLeft(): boolean {
    try {
      for (let i = 0; i < this.game.numOfRows; i++) {
        if (this.canMoveRowToLeft(this.game.board[i])) throw new Error();
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  canMoveToDown(): boolean {
    try {
      for (let i = 0; i < this.game.numOfCols; i++) {
        let newColumn = this.getColumn(i);
        if (this.canMoveRowToRight(newColumn)) throw new Error();
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  canMoveToUp(): boolean {
    try {
      for (let i = 0; i < this.game.numOfCols; i++) {
        let newColumn = this.getColumn(i);
        if (this.canMoveRowToLeft(newColumn)) throw new Error();
      }
      return false;
    } catch (error) {
      return true;
    }
  }



  haveTwoSameConsecutives(row: number[]) {
    try {
      for (let i = 0; i < this.game.numOfCols - 1; i++) {
        if (row[i] != 0 && row[i] == row[i + 1]) throw new Error();
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  //Recrear movimiento a la izquierda en 2048
  addLeftRow(row: number[]) {
    let row1 = this.quitarCeros(row);
    let row2 = this.sumarDosElementosIguales(row1);
    return this.quitarCeros(row2);
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
    let rowAux = this.invertirArray(row);
    rowAux = this.addLeftRow(rowAux);
    return this.invertirArray(rowAux);
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

  /*Devuelve un array con los elementos de la columna que se le pasa por parametro */
  getColumn(indexCol: number) {
    let columnToReturn: number[] = ANY_ROW;
    for (let i = 0; i < this.game.numOfCols; i++) {
      columnToReturn[i] = this.game.board[i][indexCol];
    }
    return columnToReturn;
  }

  /* Dada una columna y un indice, setea el valor en la columna */
  setColumn(column: number[], indexCol: number) {
    let newBoard = JSON.parse(JSON.stringify(this.game.board));
    for (let i = 0; i < this.game.numOfCols; i++) {
      newBoard[i][indexCol] = column[i];
    }
    this.store.dispatch(setBoard({ board: newBoard }));
  }

  /*Devuelve una row del board del game */
  getRow(indexRow: number) {
    return this.game.board[indexRow];
  }

  /*Dada una row y un indice, busca en el board del game y setea la row en el indice dado */
  setRow(row: number[], indexRow: number) {
    let newBoard = JSON.parse(JSON.stringify(this.game.board));
    newBoard[indexRow] = row;
    this.store.dispatch(setBoard({ board: newBoard }));
  }

  /* Verifica si puede mover la fila a la izquierda */
  canMoveRowToLeft(row: number[]) {
    return this.isHaveSpaceLeft(row) || this.haveTwoSameConsecutives(row);
  }

  /*Verifica si puede mover la fila a la derecha */
  canMoveRowToRight(row: number[]) {
    return this.isHaveSpaceRight(row) || this.haveTwoSameConsecutives(row);
  }

  /*Dado un array de numeros, recorre cada elemento y si uno es 0, lo reemplaza por el siguiente.
  Hasta que no haya mas 0s*/
  quitarCeros(row: number[]) {
    let newRow = JSON.parse(JSON.stringify(row));
    let aux;
    let haveSpace = true;
    while (haveSpace) {
      haveSpace = this.isHaveSpaceLeft(newRow);
      for (let i = 0; i < this.game.numOfCols - 1; i++) {
        if (newRow[i] == 0) {
          aux = newRow[i];
          newRow[i] = newRow[i + 1];
          newRow[i + 1] = aux;
        }
      }
    }
    return newRow;
  }

  /*Dado un array de numeros, recorre cada elemento y si el elemento es igual al siguiente (controlando que no se salga del arreglo),
  los suma, y el siguiente lo pone en 0. */
  sumarDosElementosIguales(row: number[]) {
    let newRow = JSON.parse(JSON.stringify(row));
    let haveSpace = true;
    while (haveSpace) {
      haveSpace = this.isHaveSpaceLeft(row);
      for (let i = 0; i < this.game.numOfCols - 1; i++) {
        if (newRow[i] == newRow[i + 1]) {
          newRow[i] = newRow[i] + newRow[i + 1];
          newRow[i + 1] = ANY_CELL;
          this.store.dispatch(setScore({ score: this.game.score + newRow[i] }));
          i++;
        }
      }
    }
    return newRow;
  }

  /*Dado un array de numeros, lo retorna al revés*/
  invertirArray(row: number[]) {
    let aux;
    let copyRow = JSON.parse(JSON.stringify(row));
    let arrayToReturn = [];
    const quantItems = copyRow.length;
    for (let i = quantItems - 1; i >= 0; i--) {
      arrayToReturn.push(copyRow[i]);
    }
    return arrayToReturn;
  }





  //------------ SAVE STATES -----------------//

  /* Dado un game de tipo Game, si el localStorage 'back-states' no existe, lo crea y guarda el game en el.
  Si existe, lo recupera, lo parsea y:
   - Verifica si tiene menos de 3 elementos, en ese caso utiliza el push
   - Si tiene 3 elementos o más, utiliza el push y quita el primer elemento, posteriormente lo guarda. */
  saveBackState(game: Game) {
    let backStates = localStorage.getItem(LOCAL_STORAGE.BACK_STATES);
    if (backStates) {
      let backStatesParsed = JSON.parse(backStates);
      backStatesParsed.push(game);
      if (3 < backStatesParsed.length) { //Recordemos que va a tener el nuevo elemento guardado
        backStatesParsed.shift();
      }
      localStorage.setItem(LOCAL_STORAGE.BACK_STATES, JSON.stringify(backStatesParsed));
    } else {
      localStorage.setItem(LOCAL_STORAGE.BACK_STATES, JSON.stringify([game]));
    }
  }

  /*Verifica si existe el localStorage 'back-states', si existe, lo recupera, lo parsea y devuelve el último elemento.
  si no existe, devuelve null */
  getBackState() {
    let backStates = localStorage.getItem(LOCAL_STORAGE.BACK_STATES);
    if (backStates) {
      let backStatesParsed = JSON.parse(backStates);
      return backStatesParsed[backStatesParsed.length - 1];
    } else {
      return null;
    }
  }

  saveState(game:Game){
    localStorage.setItem(LOCAL_STORAGE.CURRENT_STATE, JSON.stringify(game));
  }

  getSaveState(){
    let currentState = localStorage.getItem(LOCAL_STORAGE.CURRENT_STATE);
    if(currentState){
      return JSON.parse(currentState);
    }
    return null;
  }

  //---------------------------------------\\

  /*Escucha los enventos del teclado y ejecuta la acción correspondiente*/
  @HostListener('document:keydown', ['$event'])
  listenerKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.moveTo('left');
        break;
      case 'ArrowRight':
        this.moveTo('right');
        break;
      case 'ArrowUp':
        this.moveTo('up');
        break;
      case 'ArrowDown':
        this.moveTo('down');
        break;
      default:
        break;
    }
  }
}
