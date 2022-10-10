export interface Game {
    board: number[][],
    numOfRows: number,
    numOfCols: number,
    score: number,
    record: number,
    isWinner: number, //count of 2048
    isRestart:boolean,
    isFinished:boolean
}

export interface Position {
    X: number,
    Y: number
}

export interface Cell {
    value: number,
    position: Position
    
}