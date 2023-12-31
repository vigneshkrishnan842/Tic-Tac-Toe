import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerOverlayComponent } from './winner-overlay.component';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from '../game-board/game-board.component';

describe('WinnerOverlayComponent', () => {
  let component: WinnerOverlayComponent;
  let fixture: ComponentFixture<WinnerOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WinnerOverlayComponent, AppComponent, GameBoardComponent],
      imports : [CommonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WinnerOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should render Player wins correctly`, () => {
    component.currentPlayer = 0;
    component.tieFlag = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(`Player 1 wins!!`);
    expect(compiled.querySelector('p')?.textContent).toContain(`Please click anywhere to start a new game`);
    component.tieFlag = true;
    fixture.detectChanges();
    expect(compiled.querySelector('h1')?.textContent).toContain(`It's a TIE!!`);
    expect(compiled.querySelector('p')?.textContent).toContain(`Please click anywhere to start a new game`);
  });
  it(`should date is passed from parent component`, () => {
    let Appfixture = TestBed.createComponent(AppComponent);
    let app = Appfixture.componentInstance;
    Appfixture.detectChanges();
    fixture.detectChanges();

    expect(component.tieFlag).toEqual(app.tieFlag);
    expect(component.currentPlayer).toEqual(app.currentPlayer);
  });
});
