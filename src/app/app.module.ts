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
import { AlgorithmsComponent } from './algorithms/algorithms.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DatastructuresComponent } from './datastructures/datastructures.component';
import { GraphicComponent } from './graphic/graphic.component';
import { MachineLearningComponent } from './machine-learning/machine-learning.component';
import { DataScienceComponent } from './data-science/data-science.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ToolsComponent } from './tools/tools.component';
import { MathComponent } from './math/math.component';
import { AVLTreeSVGComponent } from "./datastructures/avl_tree_svg.component";
import { AVLTreeComponent } from "./datastructures/avltree/avltree.component";
import { ArrayComponent } from './datastructures/array/array.component';
import { LinkedlistsComponent } from './datastructures/linkedlists/linkedlists.component';
import { RecipeComponent } from './projects/recipe/recipe.component';
import { HeapComponent } from './datastructures/heap/heap.component';
import { DuplicateZerosComponent } from './coding-challenges/duplicate-zeros/duplicate-zeros.component';
import { CodingChallengesComponent } from './coding-challenges/coding-challenges.component';
import { SortedSquaresComponent } from './coding-challenges/sorted-squares/sorted-squares.component';
import { D3Service } from "./d3.service";
import { StageComponent } from './coding-challenges/stage/stage.component';
import { SortedSquaresStageComponent } from './coding-challenges/sorted-squares/sorted-squares-stage/sorted-squares-stage.component';
import { MaxConsecutiveOnesComponent } from './coding-challenges/max-consecutive-ones/max-consecutive-ones.component';
import { MaxConsecutiveOnesStageComponent } from './coding-challenges/max-consecutive-ones/max-consecutive-ones-stage/max-consecutive-ones-stage.component';


@NgModule({
  declarations: [
    AppComponent,
    JournalComponent,
    ProjectsComponent,
    TopicsComponent,
    NewEntryComponent,
    NewPostFormComponent,
    AlgorithmsComponent,
    WelcomeComponent,
    DatastructuresComponent,
    GraphicComponent,
    MachineLearningComponent,
    DataScienceComponent,
    StatisticsComponent,
    ToolsComponent,
    MathComponent,
    AVLTreeSVGComponent,
    AVLTreeComponent,
    ArrayComponent,
    LinkedlistsComponent,
    RecipeComponent,
    HeapComponent,
    DuplicateZerosComponent,
    CodingChallengesComponent,
    SortedSquaresComponent,
    StageComponent,
    SortedSquaresStageComponent,
    MaxConsecutiveOnesComponent,
    MaxConsecutiveOnesStageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
