import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListItemComponent } from './pages/new-list-item/new-list-item.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';

const routes: Routes = [
  { path: '', component: TaskViewComponent },
  { path: 'new-list-item', component: NewListItemComponent },
  { path: 'new-task/:id', component: NewTaskComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
