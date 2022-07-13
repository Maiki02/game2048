import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private row=[0,0,0,0];
  public board=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  constructor() { 
    console.log("CREANDO GAME")
  }

  ngOnInit(): void {
  }

}
