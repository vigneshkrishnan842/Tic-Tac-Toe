import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardComponent, gameStatusFlagsInterface } from './game-board.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create game board component', () => {
    expect(component).toBeTruthy();
  });

  
  it('testing game board reset()', () => {
    component.reset();
    expect(component.currentPlayer).toEqual(0);
    expect(component.movesCount).toEqual(0);
    expect(component.gameStatus).toEqual([[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]);
    expect(component.winnerHighlight).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  });

  
  it('testing game board buttonClick()', () => {
    spyOn(component, 'buttonClick').and.callThrough();
    spyOn(component.gameStatusFlags, 'emit').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('.innerDiv');
    button.click();
    expect(component.buttonClick).toHaveBeenCalled();
    expect(component.movesCount).toEqual(1);
    expect(component.currentPlayer).toEqual(1);
    let gameStatusEvents : gameStatusFlagsInterface = {
      winnerFlag: false,
      gameOver: false,
      currentPlayer: component.currentPlayer,
      tieFlag: false
    };
    expect(component.gameStatusFlags.emit).toHaveBeenCalled();
    expect(component.gameStatusFlags.emit).toHaveBeenCalledWith(gameStatusEvents);
  });

  it('testing game board buttonClick() - movesCount>=5 case', () => {
    spyOn(component, 'buttonClick').and.callThrough();
    spyOn(component, 'checkWinner').and.callThrough();
    spyOn(window, 'setTimeout').and.callThrough();
    spyOn(component.gameStatusFlags, 'emit').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[0];
    let button2 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[1];
    let button3 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[2];
    let button4 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[3];
    let button5 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[4];
    button.click();
    button4.click();
    button2.click();
    button5.click();
    button3.click();
    expect(component.buttonClick).toHaveBeenCalled();
    expect(component.movesCount).toEqual(5);
    expect(component.checkWinner).toHaveBeenCalled();
    let temp = component.checkWinner();
    expect(temp).toBe(true);
    expect(setTimeout).toHaveBeenCalled();
    let gameStatusEvents : gameStatusFlagsInterface = {
      winnerFlag: false,
      gameOver: false,
      currentPlayer: component.currentPlayer,
      tieFlag: false
    };
    gameStatusEvents.winnerFlag = true;
    expect(component.gameStatusFlags.emit).toHaveBeenCalled();
    expect(component.gameStatusFlags.emit).toHaveBeenCalledWith(gameStatusEvents);
    setTimeout(() => { 
      gameStatusEvents.gameOver = true;
      expect(component.gameStatusFlags.emit).toHaveBeenCalled();
      expect(component.gameStatusFlags.emit).toHaveBeenCalledWith(gameStatusEvents);  
    }, 800);
  });
  it('testing buttonClick() - no winner and movesCount>=5 case', () => {
    spyOn(component, 'buttonClick').and.callThrough();
    spyOn(component, 'checkWinner').and.callThrough();
    spyOn(component.gameStatusFlags, 'emit').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[0];
    let button2 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[1];
    let button4 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[3];
    let button5 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[4];
    let button6 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[5];
    button.click();
    button4.click();
    button2.click();
    button5.click();
    button6.click();
    expect(component.buttonClick).toHaveBeenCalled();
    expect(component.movesCount).toEqual(5);
    expect(component.checkWinner).toHaveBeenCalled();
    let temp = component.checkWinner();
    expect(temp).toBe(false);
    let gameStatusEvents : gameStatusFlagsInterface = {
      winnerFlag: false,
      gameOver: false,
      currentPlayer: component.currentPlayer,
      tieFlag: false
    };
    expect(component.gameStatusFlags.emit).toHaveBeenCalled();
    expect(component.gameStatusFlags.emit).toHaveBeenCalledWith(gameStatusEvents);
  });
  it('testing game board buttonClick() - TIE case', () => {
    spyOn(component, 'buttonClick').and.callThrough();
    spyOn(component, 'checkWinner').and.callThrough();
    spyOn(window, 'setTimeout').and.callThrough();
    spyOn(component.gameStatusFlags, 'emit').and.callThrough();
    let button1 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[0];
    let button2 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[1];
    let button3 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[2];
    let button4 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[3];
    let button5 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[4];
    let button6 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[5];
    let button7 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[6];
    let button8 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[7];
    let button9 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[8];
    button1.click();
    button4.click();
    button2.click();
    button5.click();
    button6.click();
    button3.click();
    button7.click();
    button8.click();
    button9.click();
    expect(component.buttonClick).toHaveBeenCalled();
    expect(component.movesCount).toEqual(9);
    expect(component.checkWinner).toHaveBeenCalled();
    let temp = component.checkWinner();
    expect(temp).toBe(false);
    expect(setTimeout).toHaveBeenCalled();
    let gameStatusEvents : gameStatusFlagsInterface = {
      winnerFlag: true,
      gameOver: false,
      currentPlayer: component.currentPlayer,
      tieFlag: true
    };
    setTimeout(() => { 
      gameStatusEvents.gameOver = true;
      expect(component.gameStatusFlags.emit).toHaveBeenCalled();
      expect(component.gameStatusFlags.emit).toHaveBeenCalledWith(gameStatusEvents);  
    }, 800);
  });
  it('testing  checkWinner() - row case', () => {
    //Player 1 wins on row 1
    spyOn(component, 'buttonClick').and.callThrough();
    spyOn(component, 'checkWinner').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[0];
    let button2 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[1];
    let button3 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[2];
    let button4 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[3];
    let button5 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[4];
    button.click();
    button4.click();
    button2.click();
    button5.click();
    button3.click();
    expect(component.buttonClick).toHaveBeenCalled();
    expect(component.movesCount).toEqual(5);
    expect(component.checkWinner).toHaveBeenCalled();
    let temp = component.checkWinner();
    expect(temp).toBe(true);
    expect(component.winnerHighlight[0][0]).toEqual(1);
    expect(component.winnerHighlight[0][1]).toEqual(1);
    expect(component.winnerHighlight[0][2]).toEqual(1);
    expect(component.gameStatus[0][0]).toEqual(0);
    expect(component.gameStatus[0][1]).toEqual(0);
    expect(component.gameStatus[0][2]).toEqual(0);
  });
  it('testing  checkWinner() - column case', () => {
    //Player 2 wins on column 2
    spyOn(component, 'buttonClick').and.callThrough();
    spyOn(component, 'checkWinner').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[0];
    let button2 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[1];
    let button3 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[2];
    let button4 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[3];
    let button5 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[4];
    let button8 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[7];
    button.click();
    button2.click();
    button4.click();
    button5.click();
    button3.click();
    button8.click();
    expect(component.buttonClick).toHaveBeenCalled();
    expect(component.movesCount).toEqual(6);
    expect(component.checkWinner).toHaveBeenCalled();
    let temp = component.checkWinner();
    expect(temp).toBe(true);
    expect(component.winnerHighlight[0][1]).toEqual(1);
    expect(component.winnerHighlight[1][1]).toEqual(1);
    expect(component.winnerHighlight[2][1]).toEqual(1);
    expect(component.gameStatus[0][1]).toEqual(1);
    expect(component.gameStatus[1][1]).toEqual(1);
    expect(component.gameStatus[2][1]).toEqual(1);
  });
  it('testing  checkWinner() - Diagonal case', () => {
    //Player 1 wins on Diagonal
    spyOn(component, 'buttonClick').and.callThrough();
    spyOn(component, 'checkWinner').and.callThrough();
    let button1 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[0];
    let button2 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[1];
    let button5 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[4];
    let button6 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[5];
    let button9 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[8];
    button1.click();
    button2.click();
    button5.click();
    button6.click();
    button9.click();
    expect(component.buttonClick).toHaveBeenCalled();
    expect(component.movesCount).toEqual(5);
    expect(component.checkWinner).toHaveBeenCalled();
    let temp = component.checkWinner();
    expect(temp).toBe(true);
    expect(component.winnerHighlight[0][0]).toEqual(1);
    expect(component.winnerHighlight[1][1]).toEqual(1);
    expect(component.winnerHighlight[2][2]).toEqual(1);
    expect(component.gameStatus[0][0]).toEqual(0);
    expect(component.gameStatus[1][1]).toEqual(0);
    expect(component.gameStatus[2][2]).toEqual(0);
  });
  it('testing  checkWinner() - Cross-Diagonal case', () => {
    //Player 2 wins on Cross-diagonal
    spyOn(component, 'buttonClick').and.callThrough();
    spyOn(component, 'checkWinner').and.callThrough();
    let button1 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[0];
    let button3 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[2];
    let button2 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[1];
    let button5 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[4];
    let button6 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[5];
    let button7 = fixture.debugElement.nativeElement.querySelectorAll('.innerDiv')[6];
    button1.click();
    button3.click();
    button2.click();
    button5.click();
    button6.click();
    button7.click();
    expect(component.buttonClick).toHaveBeenCalled();
    expect(component.movesCount).toEqual(6);
    expect(component.checkWinner).toHaveBeenCalled();
    let temp = component.checkWinner();
    expect(temp).toBe(true);
    expect(component.winnerHighlight[2][0]).toEqual(1);
    expect(component.winnerHighlight[1][1]).toEqual(1);
    expect(component.winnerHighlight[0][2]).toEqual(1);
    expect(component.gameStatus[2][0]).toEqual(1);
    expect(component.gameStatus[1][1]).toEqual(1);
    expect(component.gameStatus[0][2]).toEqual(1);
  });

});
