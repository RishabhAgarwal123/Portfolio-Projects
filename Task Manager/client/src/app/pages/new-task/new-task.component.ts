import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskResponse } from 'src/app/models/task.modet';
import { getListId } from 'src/app/redux/actions/app.actions';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId !: string;
  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute, private store: Store) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
       const prodId = params['id'];
       this.listId = prodId;
    })
  }

  createTaskItem(title: string) {
    const id = localStorage.getItem('listId') || '';
    this.taskService.createTask(title, id).subscribe(
      (res: TaskResponse) => {
        if (res?.success) {
          localStorage.setItem('listIdFromTask', res?.task?.listId);
          this.router.navigate(['/']);
        }
      },
      (error) => console.log(error)
    )
  }

}
