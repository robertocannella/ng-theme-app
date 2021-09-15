import { environment } from "src/environments/environment";
import { AngularFireModule } from '@angular/fire/compat';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { JournalComponent } from './journal/journal.component';
import { ProjectsComponent } from './projects/projects.component';
import { TopicsComponent } from './journal/topics/topics.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { NewPostFormComponent } from './new-post-form/new-post-form.component';

@NgModule({
  declarations: [
    AppComponent,
    JournalComponent,
    ProjectsComponent,
    TopicsComponent,
    NewEntryComponent,
    NewPostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
