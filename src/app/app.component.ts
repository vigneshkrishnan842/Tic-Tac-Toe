import {Component, Input, ViewChild} from '@angular/core';
import { GameBoardComponent, gameStatusFlagsInterface } from './game-board/game-board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tic-tac-toe';
  players = ['Player 1', 'Player 2'];
  currentPlayer = 0; 
  winnerFlag = false;
  gameOver = false;
  tieFlag = false;
  @ViewChild(GameBoardComponent) gameBoard !: GameBoardComponent

  constructor() { }
  
  gameStatusUpdate(event: gameStatusFlagsInterface) { 
    this.winnerFlag = event.winnerFlag;
    this.gameOver = event.gameOver;
    this.tieFlag = event.tieFlag;
    this.currentPlayer = event.currentPlayer;
  }

  reset() {
    this.gameBoard.reset();
    this.currentPlayer = 0;
    this.winnerFlag = false;
  this.gameOver = false;
  this.tieFlag = false;
  }
}
