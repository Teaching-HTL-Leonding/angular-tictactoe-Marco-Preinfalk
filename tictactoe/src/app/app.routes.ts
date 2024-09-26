import { Routes } from '@angular/router';
import { TicTacToeComponent } from './tictactoe/tictactoe.component';

export const routes: Routes = [
  {path : 'tictactoe', component: TicTacToeComponent},
  {path : '', redirectTo: '/tictactoe', pathMatch: 'full' }
];
