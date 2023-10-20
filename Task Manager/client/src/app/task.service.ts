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

  deleteList(listId: string) {
    return this.webRequestService.delete<ListResponse>(`/lists/${listId}`);
  }

  getList(listId: string) {
    return this.webRequestService.get<ListResponse>(`/lists/${listId}`);
  }
  
  getLists() {
    return this.webRequestService.get<ListResponse>('/lists');
  }

  updateList(listId: string, title: string) {
    return this.webRequestService.patch<ListResponse>(`/lists/${listId}`, { title: title });
  }

  createTask(title: string, listId: string) {
    return this.webRequestService.post<TaskResponse>(`/tasks/${listId}`, { title: title});
  }

  deleteTask(taskId: string, listId: string) {
    return this.webRequestService.delete<TaskResponse>(`/tasks/${taskId}+${listId}`);
  }

  completed(task: TaskResponse) {
    return this.webRequestService.patch<TaskResponse>(`/tasks/${task?._id}`, { completed: !task.completed, title: task?.title });
  }

  editTask(taskId: string, title: string) {
    return this.webRequestService.patch<TaskResponse>(`/tasks/${taskId}`, { title: title});
  }

  getTask(taskId: string) {
    return this.webRequestService.get<TaskResponse>(`/tasks/single/${taskId}`);
  }

  getTasks(id: string) {
    return this.webRequestService.get<TaskResponse>(`/tasks/${id}`);
  }
}