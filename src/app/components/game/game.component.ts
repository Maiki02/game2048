import { HostListener, Component, OnInit } from '@angular/core';
import { ANY_BOARD, ANY_CELL, ANY_ROW, BOARD_TESTING } from 'src/app/shared/const/const';
import { Game, Position } from 'src/app/shared/interfaces/game.interface';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {}

}
