import {Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tic-tac-toe';
  multi: number[][] = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
  gameStatus: number[][] = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
  players = ['Player 1', 'Player 2'];
  currentPlayer = 0; 
  movesCount = 0;
  winnerFlag = false;
  gameOver = false;
  tieFlag = false;

  constructor() { }
  checkWinner() {
    //Row check
    for (let i = 0,j=0; i < this.gameStatus.length; i++){
      if ((this.gameStatus[i][j] === this.gameStatus[i][j + 1]) && (this.gameStatus[i][j] === this.gameStatus[i][j + 2]) && (this.gameStatus[i][j] !== -1)) {
              document.getElementById('0' + i + j)!.style.color = '#fafcfb';
              document.getElementById('0' + i + (j+1))!.style.color = '#fafcfb';
              document.getElementById('0' + i + (j+2))!.style.color = '#fafcfb';
              document.getElementById('' + i + j)!.style.backgroundColor = '#28a688';
              document.getElementById('' + i + (j+1))!.style.backgroundColor = '#28a688';
              document.getElementById('' + i + (j+2))!.style.backgroundColor = '#28a688';              
            return true;
      }
    }
    //Column check
    for (let i = 0,j=0; j < this.gameStatus[0].length; j++){
      if ((this.gameStatus[i][j] === this.gameStatus[i+1][j]) && (this.gameStatus[i][j] === this.gameStatus[i+2][j]) &&  (this.gameStatus[i][j] !== -1)) {
            document.getElementById('0' + i + j)!.style.color = '#fafcfb';
            document.getElementById('0' + (i+1) + j)!.style.color = '#fafcfb';
            document.getElementById('0' + (i+2) + j)!.style.color = '#fafcfb';
            document.getElementById('' + i + j)!.style.backgroundColor = '#28a688';
            document.getElementById('' + (i+1) + j)!.style.backgroundColor = '#28a688';
            document.getElementById('' + (i+2) + j)!.style.backgroundColor = '#28a688';
            return true;
      }
    }
    //Diagonal check
    for (let i = 1, j = 1; i < this.gameStatus.length && j < this.gameStatus[0].length; i++, j++){
      if (this.gameStatus[i - 1][j - 1] === this.gameStatus[i][j]) {
        if (i === this.gameStatus.length - 1) {
          document.getElementById('0' + i + j)!.style.color = '#fafcfb';
          document.getElementById('0' + (i-1) + (j-1))!.style.color = '#fafcfb';
          document.getElementById('0' + (i-2) + (j-2))!.style.color = '#fafcfb';
          document.getElementById('' + i + j)!.style.backgroundColor = '#28a688';
          document.getElementById('' + (i-1) + (j-1))!.style.backgroundColor = '#28a688';
          document.getElementById('' + (i-2) + (j-2))!.style.backgroundColor = '#28a688';
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
          document.getElementById('0' + i + j)!.style.color = '#fafcfb';
          document.getElementById('0' + (i-1) + (j+1))!.style.color = '#fafcfb';
          document.getElementById('0' + (i+1) + (j-1))!.style.color = '#fafcfb';
          document.getElementById('' + i + j)!.style.backgroundColor = '#28a688';
          document.getElementById('' + (i-1) + (j+1))!.style.backgroundColor = '#28a688';
          document.getElementById('' + (i + 1) + (j - 1))!.style.backgroundColor = '#28a688';
            return true;
      }  
      } else {
        break;
      }
    }
    return false;
  }
  reset() {
    console.log('inside reset()');
    const innerBoxes = document.getElementsByClassName('innerDiv');
    for (let i = 0; i < innerBoxes.length; i++) { 
      const ele = innerBoxes[i] as HTMLElement;
      ele.style.backgroundColor = '#fafcfb';
      ele.textContent = '';
    }
    this.gameStatus = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    this.currentPlayer = 0; 
    this.movesCount = 0;  
    this.winnerFlag = false;
    this.gameOver = false;
    this.tieFlag = false;
  }

  buttonClick(i: number, j: number) {
    if (this.gameStatus[i][j] === -1) {
      let inputValue = document.createElement('div');
      inputValue.textContent = this.currentPlayer === 0 ? 'X' : 'O';
      inputValue.style.fontFamily = 'sans-serif';
      inputValue.style.fontSize = 'xxx-large';
      inputValue.id = '0' + i + j ;
      inputValue.style.color = this.currentPlayer === 0 ? '#28a688' : '#0b332a';
      document?.getElementById('' + i + j)?.appendChild(inputValue);
      this.gameStatus[i][j] = this.currentPlayer;
      this.movesCount++;
      if (this.movesCount >= 5) {
        let tempWinner = this.checkWinner();
        if (tempWinner) {
            this.winnerFlag = tempWinner;
          setTimeout(() => {
            this.gameOver = tempWinner;
          }, 800);
        } else { 
          if (this.movesCount === 9) { 
            this.tieFlag = true;
            this.winnerFlag = true;
            setTimeout(() => {
              this.gameOver = this.tieFlag;
            }, 800);
          } else {
            this.currentPlayer = this.currentPlayer === 0 ? 1 : 0; 
          }
        }
      }else {
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
      }
    }
}
}
