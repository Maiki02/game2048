export interface Game {
    board: Cell[][],
    numOfRows: number,
    numOfCols: number,
    score: number,
    record: number,
    quantMovements: number,
    isWinner: number, //count of 2048
    isRestart:boolean,
    isFinished:boolean,
    isShowHowToPlay:boolean,
}



export interface Position {
    X: number,
    Y: number
}

export interface Cell {
    id: number,
    value: number,
    isAdd: boolean,
}

export interface CellComplete extends Cell{
    position: Position,
    isNew: boolean, 
}

