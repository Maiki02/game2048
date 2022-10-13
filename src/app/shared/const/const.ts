import { Cell, Game } from "../interfaces/game.interface";

export const INITIAL_GAME_STATE: Game ={
    board: [],
    numOfCols: 0,
    numOfRows: 0,
    score: 0,
    quantMovements: 2, //Inicia con 2 porque se generan 2 numeros aleatorios por default
    record: 0,
    isWinner: 0, //Count of 2048
    isFinished: false, //Only true when the player loses
    isRestart: false //Only true when the player wants to restart the game
  };


export const VALUE_TO_WIN=2048;


export const ANY_CELL = 0;
export const ANY_ROW = [ANY_CELL, ANY_CELL, ANY_CELL, ANY_CELL];


export const ANY_ROW_CELL= [
  { id: 0, value: ANY_CELL, isAdd: false },
  { id: 1, value: ANY_CELL, isAdd: false },
  { id: 2, value: ANY_CELL, isAdd: false },
  { id: 3, value: ANY_CELL, isAdd: false }
]


export const ROW_TESTING= [0,10,0,0]
export const ROW_TESTING_FINISHED=[10,0,0,0];
export const ROW_TESTING_2=[0,0,0,2];

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
  [0, 2, 0, 0],
]
export const BOARD_TESTING_2_FINISHED=[
  [4, 4, 0, 0],
  [4, 4, 0, 0],
  [8, 0, 0, 0],
  [2, 0, 0, 0],
]
export const ANY_BOARD = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export const ANY_BOARD_CELL:Cell[][] = [
  [
    { id: 0, value: 0, isAdd: false },
    { id: 0, value: 0, isAdd: false },
    { id: 0, value: 0, isAdd: false },
    { id: 0, value: 0, isAdd: false },
  ],
  [
    { id: 0, value: 0, isAdd: false },
    { id: 0, value: 0, isAdd: false },
    { id: 0, value: 0, isAdd: false },
    { id: 0, value: 0, isAdd: false },
  ],
  [
    { id: 0, value: 0, isAdd: false },
    { id: 0, value: 0, isAdd: false },
    { id: 0, value: 0, isAdd: false },
    { id: 0, value: 0, isAdd: false },
  ],
  [
    { id: 0, value: 0, isAdd: false },
    { id: 0, value: 0, isAdd: false },
    { id: 0, value: 0, isAdd: false },
    { id: 0, value: 0, isAdd: false },
  ],
];