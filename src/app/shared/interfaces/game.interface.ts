export interface Game {
    board: number[][],
    numOfRows: number,
    numOfCols: number,
    score: number,
}

export interface Position {
    X: number,
    Y: number
}