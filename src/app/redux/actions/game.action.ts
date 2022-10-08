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

