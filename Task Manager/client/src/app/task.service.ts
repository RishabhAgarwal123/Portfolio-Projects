import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { ListResponse } from './models/list.model';
import { TaskResponse } from './models/task.modet';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  createList(title: string) {
    return this.webRequestService.post<ListResponse>('/lists', { title: title });
  }

  createTask(title: string, listId: string) {
    return this.webRequestService.post<TaskResponse>(`/tasks/${listId}`, { title: title});
  }

  getLists() {
    return this.webRequestService.get<ListResponse>('/lists');
  }

  getTasks(id: string) {
    return this.webRequestService.get<TaskResponse>(`/tasks/${id}`);
  }
}