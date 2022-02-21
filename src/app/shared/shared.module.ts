import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppRoutingModule } from '../app-routing.module';
import { faArrowCircleDown, faArrowLeft, faBackward, faRecycle, faRedo, fas, faUndo } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCoffee, faBook, faProjectDiagram, faLessThan,
  faGreaterThan, faPlus, faMinus,
  faRobot, faFilter, faPencilRuler,
  faBezierCurve, faChevronRight, faChevronLeft, faBars,
  faCalculator, faCheckCircle, faHeart, faSearch, faRandom, faWindowClose, faTimes, faCode
} from '@fortawesome/free-solid-svg-icons';
import { faStackOverflow, faGithub, faMedium, faGit } from '@fortawesome/free-brands-svg-icons';
import { TextPostComponent } from './components/text-post/text-post.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CodePostComponent } from './components/code-post/code-post.component';
import { ImagePostComponent } from './components/image-post/image-post.component';
import { CodeBlockComponent } from './components/code-block/code-block.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KatexModule } from 'ng-katex';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { D3Service } from '../d3.service';

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
    CodeBlockComponent,
    ImagePostComponent,
    DragDropModule,
    OverlayModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatGridListModule,
    MatProgressBarModule,
    YouTubePlayerModule,
    BrowserAnimationsModule,
    KatexModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatButtonToggleModule



  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatInputModule,
    MatCardModule,
    MatSliderModule,
    MatButtonToggleModule,
    KatexModule
  ],
  providers: [D3Service],
})
export class SharedModule {

  constructor(private library: FaIconLibrary) {
    library.addIconPacks(fas, far);
    library.addIcons(
      faCoffee, faGit, faGithub,
      faStackOverflow, faMedium,
      faBook, faProjectDiagram,
      faLessThan, faGreaterThan,
      faPlus, faMinus, faRobot,
      faFilter, faPencilRuler, faBezierCurve,
      faChevronRight, faChevronLeft, faBars,
      faCalculator, faCheckCircle, faHeart,
      faRandom, faSearch, faWindowClose,
      faTimes, faCode, faBars, faRecycle, faRedo, faUndo,
      faBackward, faArrowLeft)
  }
}
