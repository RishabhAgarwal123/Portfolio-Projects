import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { ScrollbarDirective } from './directives/scrollbar.directive';
import { HeaderContentComponent } from './header-content/header-content.component';
import { ProgressComponent } from './progress/progress.component';
import { CircularProgressComponent } from './circular-progress/circular-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    PageNotFoundComponent,
    ContentComponent,
    AboutComponent,
    HeaderComponent,
    ScrollbarDirective,
    HeaderContentComponent,
    ProgressComponent,
    CircularProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
