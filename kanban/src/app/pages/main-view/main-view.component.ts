import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
  board: Board = new Board('Active Sprint', [
    new Column('Open', [
      'PDC name not highlighted', 
      'HTTP Connection Type',
      'Web Service Connection Type'
    ]),
    new Column('In Progress', [
      'PDC Validation Issues',
      'All Connection Types'
    ]),
    new Column('Testing', [
      'Creating all connection types',
      'To test all existing connection types'
    ]),
    new Column('Done', [
      'Copy PDC',
      'Transfer PDC',
      'Searching in PDC list'
    ]),
  ]);

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
