import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListResponse } from 'src/app/models/list.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list-item',
  templateUrl: './new-list-item.component.html',
  styleUrls: ['./new-list-item.component.scss']
})
export class NewListItemComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  createListItem(title: string) {
    this.taskService.createList(title).subscribe(
      (res: ListResponse) => {
        if (res?.success) {
          this.router.navigate(['/']);
        }
      },
      (error) => console.log(error)
    )
  }
}
