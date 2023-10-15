import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListResponse } from 'src/app/models/list.model';
import { TaskResponse } from 'src/app/models/task.modet';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists: any[] = []; // Define an array to store the lists
  tasks: any[] = [];
  activeItemIndex !: number;
  listId !: string;
  
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
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

  getTaskAssociated(list: ListResponse, index: number) {
    this.activeItemIndex = index;
    this.listId = list._id;
    this.taskService.getTasks(list?._id).subscribe(
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

  navigate() {
    this.router.navigate([`/new-task/${this.listId}`]);
  }
}
