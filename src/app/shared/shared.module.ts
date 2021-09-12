import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';



@NgModule({
  declarations: [
    SidenavComponent
  ],
  exports: [
    SidenavComponent,
    MaterialModule
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
