import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-winner-overlay',
  templateUrl: './winner-overlay.component.html',
  styleUrl: './winner-overlay.component.css'
})
export class WinnerOverlayComponent {
  @Input() tieFlag = false;
  players = ['Player 1', 'Player 2'];
  @Input() currentPlayer = 0; 
}
