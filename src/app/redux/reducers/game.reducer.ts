import { Action, createReducer, on } from "@ngrx/store";
import { Game } from "src/app/shared/interfaces/game.interface";
import * as actions from '../actions/game.action';

export const initialState: Game = {
    board: [],
    numOfCols: 0,
    numOfRows: 0,
    score: 0,
    record: 0,
    isFinished:false
};

const _gameReducer = createReducer(
    initialState,
    on(actions.setGameStatus, (state, action) => {
        return action.state;
    }),

    //Board
    on(actions.setBoard, (state, action) => {
        return {
            ...state,
            board: action.board
        };
    }),

    //Score
    on(actions.setScore, (state, action) => {
        return {
            ...state,
            score: action.score
        };
    }),

    //Record
    on(actions.setRecord, (state, action) => {
        return {
            ...state,
            record: action.record
        };
    }),

    //Finished
    on(actions.setFinished, (state, action) => {
        return {
            ...state,
            isFinished: action.isFinished
        };
    }),

   
)


export function gameReducer(state: any, action: Action) {
    return _gameReducer(state, action);
}

