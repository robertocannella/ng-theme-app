import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppRoutingModule } from '../app-routing.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faBook, faProjectDiagram, faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { faStackOverflow, faGithub, faMedium, faGit } from '@fortawesome/free-brands-svg-icons';
import { TextPostComponent } from './components/text-post/text-post.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { CodePostComponent } from './components/code-post/code-post.component';
import { ImagePostComponent } from './components/image-post/image-post.component';
import { CodeBlockComponent } from './components/code-block/code-block.component'


@NgModule({
  declarations: [
    SidenavComponent,
    TextPostComponent,
    CodePostComponent,
    ImagePostComponent,
    CodeBlockComponent
  ],
  exports: [
    SidenavComponent,
    TextPostComponent,
    MaterialModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatInputModule,
    MatCardModule,
    CodePostComponent,
    ImagePostComponent,
    CodeBlockComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatInputModule,
    MatCardModule
  ]
})
export class SharedModule {
  
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faCoffee, faGit, faGithub,
      faStackOverflow, faMedium,
      faBook, faProjectDiagram,
      faLessThan, faGreaterThan)
  }
}
