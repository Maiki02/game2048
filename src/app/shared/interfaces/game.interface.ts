export interface Game {
    board: number[][],
    numOfRows: number,
    numOfCols: number,
    score: number,
    record: number,
    isFinished:boolean
}

export interface Position {
    X: number,
    Y: number
}