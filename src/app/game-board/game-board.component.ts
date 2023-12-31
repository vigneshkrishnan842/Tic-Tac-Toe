import { Component, EventEmitter, Output } from '@angular/core';

export interface gameStatusFlagsInterface { 
  winnerFlag:  boolean;
  gameOver: boolean;
  currentPlayer: number;
  tieFlag: boolean;
};

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})

export class GameBoardComponent {
  multi: number[][] = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
  winnerHighlight: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  gameStatus: number[][] = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
  movesCount = 0;
  currentPlayer = 0;
  @Output() gameStatusFlags = new EventEmitter<gameStatusFlagsInterface>();

  checkWinner() {
    //Row check
    for (let i = 0,j=0; i < this.gameStatus.length; i++){
      if ((this.gameStatus[i][j] === this.gameStatus[i][j + 1]) && (this.gameStatus[i][j] === this.gameStatus[i][j + 2]) && (this.gameStatus[i][j] !== -1)) {
        this.winnerHighlight[i][j] = 1;
        this.winnerHighlight[i][j+1] = 1;
        this.winnerHighlight[i][j + 2] = 1;
        return true;
      }
    }
    //Column check
    for (let i = 0,j=0; j < this.gameStatus[0].length; j++){
      if ((this.gameStatus[i][j] === this.gameStatus[i+1][j]) && (this.gameStatus[i][j] === this.gameStatus[i+2][j]) &&  (this.gameStatus[i][j] !== -1)) {
        this.winnerHighlight[i][j] = 1;
        this.winnerHighlight[i+1][j] = 1;
        this.winnerHighlight[i + 2][j] = 1;
        return true;
      }
    }
    //Diagonal check
    for (let i = 1, j = 1; i < this.gameStatus.length && j < this.gameStatus[0].length; i++, j++){
      if (this.gameStatus[i - 1][j - 1] === this.gameStatus[i][j]) {
        if (i === this.gameStatus.length - 1) {
          this.winnerHighlight[i][j] = 1;
          this.winnerHighlight[i-1][j-1] = 1;
          this.winnerHighlight[i - 2][j - 2] = 1;
          return true;
      }  
      } else {
        break;
      }
    }
    //cross-diagonal check
    for (let i = 0, j = 2; i < this.gameStatus.length-1 && j > 0; i++, j--){
      if (this.gameStatus[i + 1][j - 1] === this.gameStatus[i][j]) {
        if (i === this.gameStatus.length - 2) {
          this.winnerHighlight[i][j] = 1;
          this.winnerHighlight[i-1][j+1] = 1;
          this.winnerHighlight[i + 1][j - 1] = 1;
          return true;
      }  
      } else {
        break;
      }
    }
    return false;
  }

  reset() {
    this.gameStatus = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    this.winnerHighlight = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    this.currentPlayer = 0;
    this.movesCount = 0;
    const gameStatusEvents : gameStatusFlagsInterface = {
      winnerFlag: false,
      gameOver: false,
      currentPlayer: 0,
      tieFlag: false
    };
  }

  buttonClick(i: number, j: number) {
    if (this.gameStatus[i][j] === -1) {
      this.gameStatus[i][j] = this.currentPlayer;
      this.movesCount++;
      let gameStatusEvents : gameStatusFlagsInterface = {
        winnerFlag: false,
        gameOver: false,
        currentPlayer: this.currentPlayer,
        tieFlag: false
      };
      if (this.movesCount >= 5) {
        let tempWinner = this.checkWinner();
        if (tempWinner) {
          gameStatusEvents.winnerFlag = tempWinner;
          this.gameStatusFlags.emit(gameStatusEvents);
          //this.winnerFlag.emit(tempWinner);
          setTimeout(() => {
            gameStatusEvents.gameOver = tempWinner;
            this.gameStatusFlags.emit(gameStatusEvents);
            //this.gameOver.emit(tempWinner);
          }, 800);
        } else { 
          if (this.movesCount === 9) { 
            gameStatusEvents.tieFlag = true;
            gameStatusEvents.winnerFlag = true;
            this.gameStatusFlags.emit(gameStatusEvents);
            setTimeout(() => {
            gameStatusEvents.gameOver = true;
            this.gameStatusFlags.emit(gameStatusEvents);
            }, 800);
          } else {
            this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
            gameStatusEvents.currentPlayer = this.currentPlayer;
            this.gameStatusFlags.emit(gameStatusEvents);
          }
        }
      }else {
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
        gameStatusEvents.currentPlayer = this.currentPlayer;
        this.gameStatusFlags.emit(gameStatusEvents);
      }
    }
}
}
