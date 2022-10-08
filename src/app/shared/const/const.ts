import { Game } from "../interfaces/game.interface";

export const INITIAL_GAME_STATE: Game ={
    board: [],
    numOfCols: 0,
    numOfRows: 0,
    score: 0,
    record: 0,
    isFinished: false,
  };


export const ANY_CELL = 0;
export const ANY_ROW = [ANY_CELL, ANY_CELL, ANY_CELL, ANY_CELL];
export const BOARD_INITIAL = [ANY_ROW, ANY_ROW, ANY_ROW, ANY_ROW];
export const BOARD_COMPLETE = [
  [0, 2, 3, 4],
  [0, 6, 7, 8],
  [0, 10, 11, 12],
  [0, 14, 15, 16],
];

export const BOARD_TESTING=[
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];;

export const BOARD_TESTING_4=[
  [5, 1, 4, 2],
  [1, 2, 3, 6],
  [3, 4, 1, 2],
  [4, 6, 4, 2],
]

export const BOARD_TESTING_3=[
  [0, 2, 0, 2],
  [0, 2, 2, 0],
  [0, 4, 0, 2],
  [4, 0, 4, 2],
]
export const BOARD_TESTING_2=[
  [2, 2, 2, 2],
  [4, 2, 2, 0],
  [4, 4, 0, 0],
  [4, 0, 4, 0],
]
export const ANY_BOARD = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];