import { createAction, props } from "@ngrx/store";

//Game status
export const setGameStatus = createAction('[GAME] Set Game Status',
    props<{ state: any }>());

//Board
export const setBoard = createAction('[GAME] Set Board',
    props<{ board: any[] }>());

//Score
export const setScore = createAction('[GAME] Set Score',
    props<{ score: number }>());

//Record
export const setRecord = createAction('[GAME] Set Record',
    props<{ record: number }>());

//Finished
export const setFinished = createAction('[GAME] Set Finished',
    props<{ isFinished: boolean }>());


//Restart Game
export const setRestartGame = createAction('[GAME] Set Restart Game',
    props<{ restartGame: boolean }>());

//Winner
export const setWinner = createAction('[GAME] Set Winner',
    props<{ isWinner: number }>());

//Show How To Play
export const setShowHowToPlay = createAction('[GAME] Set Show How To Play',
    props<{ isShowHowToPlay: boolean }>());

export const setQuantMovements = createAction('[GAME] Set Quant Movements',
    props<{ quantMovements: number }>());