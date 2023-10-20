import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListResponse } from 'src/app/models/list.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.scss']
})
export class EditListItemComponent implements OnInit {
  listId: string = '';
  title: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => this.listId = params['id']
    );
    if (this.listId) {
      this.taskService.getList(this.listId).subscribe(
        (res: ListResponse) => {
          this.title = res.list.title;
        },
        (error) => console.log(error)
      )
    }
  }

  editListItem(value: string) {
    this.taskService.updateList(this.listId, value).subscribe(
      (res: ListResponse) => {
        if (res.success) {
          this.router.navigate(['/'])
        }
      },
      (error) => console.log(error)
    )
  }
}
