import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NotificationComponent } from './notification/notification.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewListItemComponent } from './pages/new-list-item/new-list-item.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
// import { reducer } from './redux/reducer/app.reducer';
import { EditListItemComponent } from './pages/edit-list-item/edit-list-item.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebRequestInterceptorService } from './web-request-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NotificationComponent,
    NewListItemComponent,
    NewTaskComponent,
    EditListItemComponent,
    EditTaskComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
    // StoreModule.forRoot({ listId: reducer})
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebRequestInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
