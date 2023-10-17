import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ListResponse } from 'src/app/models/list.model';
import { TaskResponse } from 'src/app/models/task.modet';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists: ListResponse[] = []; // Define an array to store the lists
  tasks: any[] = [];
  activeItemIndex: any = 0;
  listId !: string;
  listIdFromTask !: string;

  constructor(private taskService: TaskService, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.listId = localStorage.getItem('listId') || '';
    this.listIdFromTask = localStorage.getItem('listIdFromTask') || '';
    this.getTask(this.listId);
    this.getLists();
  }

  getLists() {
    this.taskService.getLists().subscribe(
      (res: ListResponse) => {
        if (res?.success) {
          this.lists = res?.lists;
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getTaskAssociated(list: ListResponse, index: any) {
    localStorage.setItem('listId', list?._id);
    localStorage.setItem('activeItem', index);
    this.activeItemIndex = index;
    this.getTask(list?._id);
  }

  getTask(id: string) {
    this.taskService.getTasks(id).subscribe(
      (res: TaskResponse) => {
        if (res?.success) {
          this.tasks = res?.tasks;
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onTaskClick(task: TaskResponse) {
    // Set task to complete
    this.taskService.completed(task).subscribe(
      (res: TaskResponse) => {
        if (res.success) {
          this.getTask(this.listId);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    )
  }

  navigate() {
    this.router.navigate([`/new-task/${this.listId}`]);
  }
}
