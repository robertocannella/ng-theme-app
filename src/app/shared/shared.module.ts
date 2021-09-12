import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppRoutingModule } from '../app-routing.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faBook, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { faStackOverflow, faGithub, faMedium, faGit } from '@fortawesome/free-brands-svg-icons';


@NgModule({
  declarations: [
    SidenavComponent
  ],
  exports: [
    SidenavComponent,
    MaterialModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    FontAwesomeModule,
    
  ]
})
export class SharedModule {
  
  constructor(private library: FaIconLibrary) {
    library.addIcons(faCoffee,faGit,faGithub,faStackOverflow,faMedium, faBook, faProjectDiagram)
  }
}
