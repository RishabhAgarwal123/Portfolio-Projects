import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListItemComponent } from './pages/new-list-item/new-list-item.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { EditListItemComponent } from './pages/edit-list-item/edit-list-item.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: TaskViewComponent },
  { path: 'new-list-item', component: NewListItemComponent },
  { path: 'edit-list-item/:id', component: EditListItemComponent },
  { path: 'new-task/:id', component: NewTaskComponent },
  { path: 'edit-task/:id', component: EditTaskComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
