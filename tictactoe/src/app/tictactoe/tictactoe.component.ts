import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TicTacToeComponent {
  readonly WIDTH = 3;
  readonly HEIGHT = 3;
  readonly X_SYMBOL = '✖️';
  readonly CIRCLE_SYMBOL = '⭕';

  cells: string[][] = [];
  xIsNext = true;
  gameOver = false;
  message = '';

  constructor() {
    this.initializeGame();
  }

  initializeGame(): void {
    this.cells = Array(this.HEIGHT).fill(null).map(() => Array(this.WIDTH).fill(null));
    this.xIsNext = true;
    this.gameOver = false;
    this.message = '';
  }

  handleClick(x: number, y: number): void {
    if (this.gameOver || this.cells[y][x]) {
      return;
    }

    this.cells[y][x] = this.xIsNext ? this.X_SYMBOL : this.CIRCLE_SYMBOL;
    this.xIsNext = !this.xIsNext;
    this.checkWinner();
  }

  checkWinner(): void {
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = this.cells[y][x];
        if (!cell) {
          continue;
        }

        if (this.checkDirection(x, y, 1, 0) ||
            this.checkDirection(x, y, 0, 1) ||
            this.checkDirection(x, y, 1, 1) ||
            this.checkDirection(x, y, 1, -1)) {
          this.gameOver = true;
          this.message = `${cell} wins!`;
          return;
        }
      }
    }
  }

  checkDirection(x: number, y: number, dx: number, dy: number): boolean {
    const symbol = this.cells[y][x];

    for (let i = 1; i < 3; i++) {
      const nextRow = this.cells[y + dy * i];
      const nextCell = nextRow?.[x + dx * i];

      if (!nextCell || nextCell !== symbol) {
        return false;
      }
    }

    return true;
  }
}
