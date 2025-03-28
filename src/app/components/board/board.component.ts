import { HostListener, Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  setBoard,
  setFinished,
  setGameStatus,
  setQuantMovements,
  setScore,
  setWinner,
} from 'src/app/redux/actions/game.action';
import {
  ANY_BOARD,
  ANY_BOARD_CELL,
  ANY_CELL,
  ANY_ROW_CELL,
  INITIAL_GAME_STATE,
  VALUE_TO_WIN,
} from 'src/app/shared/const/const';
import { LOCAL_STORAGE } from 'src/app/shared/const/localStorage';
import { appState } from 'src/app/shared/interfaces/appState.interface';
import { Cell, CellComplete, Game, Position } from 'src/app/shared/interfaces/game.interface';
import { ActionsComponent } from '../actions/actions.component';
import { Subscription } from 'rxjs';

const MARGIN_CELL=10;
const SIZE_CELL=110;

const MARGIN_CELL_TABLET=7
const SIZE_CELL_TABLET=88;

const MARGIN_CELL_MOBILE=7
const SIZE_CELL_MOBILE=65;
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public game: Game = INITIAL_GAME_STATE;
  public ANY_BOARD: any[] = ANY_BOARD;
  public BOARD_GAME: CellComplete[] = [];
  private BOARD_PREVIUS_GENERATE: Cell[][] = [];
  private BOARD_PREVIUS_MOVE: Cell[][] = [];

  private touchPrevius:any;

  private game$!: Subscription;
  private board$!: Subscription;

  constructor(private store: Store<appState>) {
    this.game$= this.store.select('game').subscribe((game) => {
      this.game = game;
    });

    this.board$= this.store.select('game', 'board').subscribe((board) => {
      this.setBoardGame();
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

  ngOnDestroy(): void {
    this.game$?.unsubscribe();
    this.board$?.unsubscribe();
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
  createBoard(numOfRows: number): Cell[][] {
    return ANY_BOARD_CELL;
    //return ANY_BOARD;
    //return BOARD_TESTING;
  }

  generateRandom() {
    const freePositions = this.getFreePositions();
    const randomPosition = Math.floor(Math.random() * freePositions.length);
    const position:Position = freePositions[randomPosition];
    const newCell:Cell= {
      id: this.game.quantMovements,
      value: Math.random() > 0.04 ? 2 : 4,
      isAdd:false
    }
    //const valueToSet = Math.random() > 0.04 ? 2 : 4;
    let newBoard: Cell[][] = JSON.parse(JSON.stringify(this.game.board));
    newBoard[position.X][position.Y] = newCell;

    this.store.dispatch(setBoard({ board: newBoard }));
    this.store.dispatch(setQuantMovements({quantMovements: this.game.quantMovements+1}))
  }

  getFreePositions() {
    const arrayOfPositions: Position[] = [];
    const cantRows: number = this.game.numOfRows;
    const cantColumns: number = this.game.numOfCols;

    for (let i = 0; i < cantRows; i++) {
      for (let j = 0; j < cantColumns; j++) {
        if (this.isAnyCell(this.game.board[i][j])) {
          arrayOfPositions.push({
            X: i,
            Y: j,
          });
        }
      }
    }
    return arrayOfPositions;
  }

  isAnyCell(cell:Cell){
    return cell.value==ANY_CELL;
  }


  //------------------ MOVE TO ------------------//

  moveTo(direction: string, event?: KeyboardEvent) {
    if(event) event.preventDefault();

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
      this.BOARD_PREVIUS_GENERATE=JSON.parse(JSON.stringify(this.game.board));
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
        let newColumn:Cell[] = this.getColumn(i);
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



  haveTwoSameConsecutives(row: Cell[]) {
    try {
      for (let i = 0; i < this.game.numOfCols - 1; i++) {
        if (row[i].value != ANY_CELL && row[i].value == row[i + 1].value) throw new Error();
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  //Recrear movimiento a la izquierda en 2048
  addLeftRow(row: Cell[]):Cell[] {
    let row1:Cell[] = this.quitarCeros(row);
    let row2:Cell[] = this.sumarDosElementosIguales(row1);
    return this.quitarCeros(row2);
  }

  isHaveSpaceLeft(row: Cell[]): boolean {
    try {
      for (let i = 0; i < this.game.numOfCols - 1; i++) {
        if (row[i].value == 0 && row[i + 1].value != 0) throw new Error();
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  addRightRow(row: Cell[]) {
    let rowAux = this.invertirArray(row);
    rowAux = this.addLeftRow(rowAux);
    return this.invertirArray(rowAux);
  }

  isHaveSpaceRight(row: Cell[]): boolean {
    let inverRow= this.invertirArray(row);
    return this.isHaveSpaceLeft(inverRow);
  }

  /*Devuelve un array con los elementos de la columna que se le pasa por parametro */
  getColumn(indexCol: number) {
    let columnToReturn: Cell[] = ANY_ROW_CELL;
    for (let i = 0; i < this.game.numOfCols; i++) {
      columnToReturn[i] = this.game.board[i][indexCol];
    }
    return columnToReturn;
  }

  /* Dada una columna y un indice, setea el valor en la columna */
  setColumn(column: Cell[], indexCol: number) {
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
  setRow(row: Cell[], indexRow: number) {
    let newBoard:Cell[][] = JSON.parse(JSON.stringify(this.game.board));
    newBoard[indexRow] = row;
    this.store.dispatch(setBoard({ board: newBoard }));
  }

  /* Verifica si puede mover la fila a la izquierda */
  canMoveRowToLeft(row: Cell[]) {
    return this.isHaveSpaceLeft(row) || this.haveTwoSameConsecutives(row);
  }

  /*Verifica si puede mover la fila a la derecha */
  canMoveRowToRight(row: Cell[]) {
    let invertRow= this.invertirArray(row);
    return this.canMoveRowToLeft(invertRow)
  }

  /*Dado un array de numeros, recorre cada elemento y si uno es 0, lo reemplaza por el siguiente.
  Hasta que no haya mas 0s*/
  quitarCeros(row: Cell[]) {
    let newRow:Cell[] = JSON.parse(JSON.stringify(row));
    let aux;
    let haveSpace = true;
    while (haveSpace) {
      haveSpace = this.isHaveSpaceLeft(newRow);
      for (let i = 0; i < this.game.numOfCols - 1; i++) {
        if (newRow[i].value == ANY_CELL) {
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
  sumarDosElementosIguales(row: Cell[]) {
    let newRow:Cell[] = JSON.parse(JSON.stringify(row));
    let haveSpace = true;
    while (haveSpace) {
      haveSpace = this.isHaveSpaceLeft(row);
      for (let i = 0; i < this.game.numOfCols - 1; i++) {
        if (newRow[i].value == newRow[i + 1].value) {
          newRow[i].value = newRow[i].value + newRow[i + 1].value;
          newRow[i].isAdd=true;

          newRow[i + 1].value = ANY_CELL;
          newRow[i+1].id=ANY_CELL;
          this.store.dispatch(setScore({ score: this.game.score + newRow[i].value }));

          if(newRow[i].value==VALUE_TO_WIN){
            //Solo lo aumentamos cuando es distinto de 2,
            //Porque si es 2, significa que cerró su modal de victoria.
            if(this.game.board.length!=2){
              this.store.dispatch(setWinner({isWinner:this.game.isWinner+1}));
            }
          }
          i++;
        }
      }
    }
    return newRow;
  }

  /*Dado un array de numeros, lo retorna al revés*/
  invertirArray(row: any[]) {
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

  goBack(){
    const actions= new ActionsComponent(this.store);
    actions.goBack();
  }

  restart(){
    const actions= new ActionsComponent(this.store);
    actions.restartGame();
  }

  isModalOpen():boolean{
    return this.game.isFinished || this.game.isWinner==1 || this.game.isRestart;
  }

  //---------------------------------------\\


  /*Escucha los enventos del teclado y ejecuta la acción correspondiente*/
  @HostListener('document:keydown', ['$event'])
  listenerKeyPress(event: KeyboardEvent) {
    
    if(!this.isModalOpen()){
      switch (event.key.toLowerCase()) {
        case 'arrowleft': this.moveTo('left', event); break;
        case 'arrowright': this.moveTo('right', event); break;
        case 'arrowup': this.moveTo('up', event); break;
        case 'arrowdown': this.moveTo('down', event); break;
        case 'b':
        case 'backspace': this.goBack(); break;
        case 'r': this.restart(); break;
        
        default: break;
      }
    }
  }
    /*Escucha los enventos tactiles y ejecuta la acción correspondiente*/
    @HostListener('document:touchend', ['$event'])
    listenerTouch(event: TouchEvent) {
      const newTouch=this.getTouch(event);
      const direction=this.calculateDirection(this.touchPrevius,newTouch);
      if(direction){
        this.moveTo(direction);
        this.touchPrevius={};
      }
    }

    /*Escucha los enventos tactiles y ejecuta la acción correspondiente*/
    @HostListener('document:touchstart', ['$event'])
    listenerTouchStart(event: TouchEvent) {
      this.touchPrevius=this.getTouch(event);
    }

    getTouch(event:TouchEvent){
      const eventAny:any=event;
      const classList:DOMTokenList=eventAny.target.classList;
      
      if(classList.contains('container-game') || classList.contains('cell')){
        return event.changedTouches[0];
      }
      return null;
    }
    
    calculateDirection(touch1:any, touch2:any){
      if(!touch1 || !touch2) return null;
      const x1=touch1.clientX;
      const y1=touch1.clientY;
      const x2=touch2.clientX;
      const y2=touch2.clientY;
      const xDiff=x2-x1;
      const yDiff=y2-y1;

      if(xDiff==0 || yDiff==0) return null;

      if(Math.abs(xDiff)>Math.abs(yDiff)){
        if(xDiff>0){
          return 'right';
        }else{
          return 'left';
        }
      }else{
        if(yDiff>0){
          return 'down';
        }else{
          return 'up';
        }
      }
    }


  isNew(i:number, j:number):boolean{
    try{
      return this.game.board[i][j].value != this.BOARD_PREVIUS_GENERATE[i][j].value;
    } catch(e){
      return false;
    }
  }

  isAdd(cell:CellComplete):boolean{
    try{
        //Buscamos el anterior estado del board.
        const transformBoard=this.transformBoard(this.getBackState().board);

        //Si la celda existe
        const index=this.idExistsOnBoard(cell.id,transformBoard);
        if(index!=-1){
          //Y tiene distinto valor que antes, entonces es una nueva
          const previusCell=transformBoard[index];
          return previusCell.value!=cell.value;
        }
      
      return false;
    } catch(e){
      return false;
    }
  }


  setBoardGame(){
    for(let i=0; i<this.game.board.length; i++){
      for(let j=0; j<this.game.board[i].length; j++){
        if(this.game.board[i][j].value!=0){
          let indexToEdit=this.idExistsOnBoard(this.game.board[i][j].id, this.BOARD_GAME);
          if(indexToEdit!= -1 ){
            this.BOARD_GAME[indexToEdit].value= JSON.parse(JSON.stringify(this.game.board[i][j].value));
            this.BOARD_GAME[indexToEdit].position.X= i;
            this.BOARD_GAME[indexToEdit].position.Y= j;
            //this.BOARD_GAME[indexToEdit].isNew= false;

        
          } else {
            let previusCell=JSON.parse(JSON.stringify(this.game.board[i][j]));

            let newItem:CellComplete={
              id: previusCell.id,
              value: previusCell.value,
              position: {
                X: i,
                Y: j
              },
              isNew: true,
              isAdd: previusCell.isAdd
            }
            this.BOARD_GAME.push(newItem);
          }
        }
      }
    }
    let quantElements=this.BOARD_GAME.length;
    let newBoard=this.transformBoard(this.game.board);
    for(let i=0; i<quantElements; i++){
      if(this.idExistsOnBoard(this.BOARD_GAME[i].id, newBoard)==-1){
        this.BOARD_GAME.splice(i,1);
        quantElements--;
      }
    }
  }
  /*setBoardGame(){
    //Transformarmos el board en un array unidimensional;
    let boardReply= this.transformBoard(this.game.board);

    //Recorremos el array unidimensional
    for(let i=0; i<this.game.board.length; i++){
      for(let j=0; j<this.game.board[i].length; j++){
        if(this.game.board[i][j].value!=0){
          let indexToEdit=this.idExistsOnBoard(this.game.board[i][j].id, this.BOARD_GAME);
          if(indexToEdit!= -1 ){
            this.BOARD_GAME[indexToEdit].value= JSON.parse(JSON.stringify(this.game.board[i][j].value));
            this.BOARD_GAME[indexToEdit].position.X= i;
            this.BOARD_GAME[indexToEdit].position.Y= j;
            this.BOARD_GAME[indexToEdit].isNew= false;
        
          } else {
            let newItem:Cell=JSON.parse(JSON.stringify(this.game.board[i][j]));
            newItem.isNew=true;
            this.BOARD_GAME.push(newItem);
          }
        }
      }
    }
    //Quitamos los elementos de BOARD_GAME que no existan en el array unidimensional
    let quantElements=this.BOARD_GAME.length;
    for(let i=0; i<quantElements; i++){
      if(this.idExistsOnBoard(this.BOARD_GAME[i].id, boardReply)==-1){
        this.BOARD_GAME.splice(i,1);
        quantElements--;
      }
    }
  }*/

  transformBoard(board:Cell[][]):Cell[]{
    let newBoard:Cell[]=[];
    for(let i=0; i<board.length; i++){
      newBoard= [...newBoard, ...board[i]];
    }
    return newBoard;
  }
  
idExistsOnBoard(id:number, board:Cell[]):number{
  let valueToReturn=-1;
  try{
    for(let i=0; i<board.length; i++){
      if(board[i].id==id){
        valueToReturn=i;
        throw new Error();
      }
    }
    return valueToReturn;
  } catch(err){
    return valueToReturn;
  }
}

getPositionInBoard(cell:CellComplete){
  return 'c'+cell.position.X+ '-'+cell.position.Y
}

adjustFontSize(value: number): string {
  const length = value.toString().length;
  const width = window.innerWidth;

  if (length <= 3) {
    if (width > 550) return "48px";
    if (width > 400) return "40px";
    return "30px";
  } 
  if (length === 4) return width > 550 ? "40px" : width > 400 ? "32px" : "24px";
  if (length === 5) return width > 550 ? "32px" : width > 400 ? "26px" : "20px";
  return width > 550 ? "26px" : width > 400 ? "22px" : "18px"; // 6 dígitos o más
}

}

