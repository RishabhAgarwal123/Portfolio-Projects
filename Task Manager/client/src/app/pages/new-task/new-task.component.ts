import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskResponse } from 'src/app/models/task.modet';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId !: string;
  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
       const prodId = params['id'];
       this.listId = prodId;
    })
  }

  createTaskItem(title: string) {
    this.taskService.createTask(title, this.listId).subscribe(
      (res: TaskResponse) => {
        if (res?.success) {
          this.router.navigate(['/']);
        }
      },
      (error) => console.log(error)
    )
  }

}
