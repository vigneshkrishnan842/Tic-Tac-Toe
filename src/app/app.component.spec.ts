import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { WinnerOverlayComponent } from './winner-overlay/winner-overlay.component';
import { GameBoardComponent, gameStatusFlagsInterface } from './game-board/game-board.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        WinnerOverlayComponent,
        GameBoardComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tic-tac-toe'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tic-tac-toe');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tic Toe Game');
  });

  it(`should render Player's turn correctly`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.currentPlayer = 0;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain(`Player 1's Turn`);
  });

  it('should render game over correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.winnerFlag = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain(`Game Over!`);
  });

  it('testing reset()', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.reset();
    expect(app.currentPlayer).toEqual(0);
    expect(app.winnerFlag).toEqual(false);
    expect(app.gameOver).toEqual(false);
    expect(app.tieFlag).toEqual(false);
  });
  
  it('testing gameStatusUpdate()', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(app, 'gameStatusUpdate').and.callThrough();
    const gameBoardElement = fixture.debugElement.query(By.css('.unittest'));
    let gameStatusEvents : gameStatusFlagsInterface = {
      winnerFlag: true,
      gameOver: false,
      currentPlayer: 1,
      tieFlag: false
    };
    gameBoardElement.triggerEventHandler('gameStatusFlags', gameStatusEvents);
    fixture.detectChanges();
    expect(app.gameStatusUpdate).toHaveBeenCalled();
    expect(app.gameStatusUpdate).toHaveBeenCalledWith(gameStatusEvents);
    expect(app.currentPlayer).toEqual(1);
    expect(app.winnerFlag).toEqual(true);
    expect(app.gameOver).toEqual(false);
    expect(app.tieFlag).toEqual(false);
  });
});
