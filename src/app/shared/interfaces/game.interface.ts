export interface Game {
    board: number[][],
    numOfRows: number,
    numOfCols: number,
    score: number,
    record: number,
    isRestart:boolean,
    isFinished:boolean
}

export interface Position {
    X: number,
    Y: number
}