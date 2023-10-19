import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskResponse } from 'src/app/models/task.modet';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskId: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => this.taskId = params['id']
    );
  }

  editTask(value: string) {
    this.taskService.editTask(this.taskId, value).subscribe(
      (res: TaskResponse) => {
        if (res.success) {
          this.router.navigate(['/'])
        }
      },
      (error) => console.log(error)
    )
  }
}
