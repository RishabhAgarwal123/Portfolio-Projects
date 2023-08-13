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
import { ContentHeaderComponent } from './content-header/content-header.component';
import { TypewriterComponent } from './typewriter/typewriter.component';
import { CountersComponent } from './counters/counters.component';
import { CountComponent } from './count/count.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { WorkComponent } from './work/work.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    CircularProgressComponent,
    ContentHeaderComponent,
    TypewriterComponent,
    CountersComponent,
    CountComponent,
    MyServicesComponent,
    WorkComponent,
    ExperienceComponent,
    ContactComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
