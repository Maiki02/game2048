import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/shared/interfaces/game.interface';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() game!: Game;
  
  constructor() { }

  ngOnInit(): void {
  }

}
