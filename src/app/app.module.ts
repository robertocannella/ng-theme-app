import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { JournalComponent } from './journal/journal.component';
import { ProjectsComponent } from './projects/projects.component';
import { TopicsComponent } from './journal/topics/topics.component';

@NgModule({
  declarations: [
    AppComponent,
    JournalComponent,
    ProjectsComponent,
    TopicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
