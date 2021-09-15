import { NewPostFormComponent } from './../new-post-form/new-post-form.component';
import { Subscription } from 'rxjs';
import { PostService } from './../post.service';
import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.sass']
})
export class JournalComponent implements OnDestroy{
  //items$: Observable<any>;
  subscription: Subscription;
  posts: any;
  isOpen = false;


  constructor(private postService: PostService, public dialog: MatDialog) {
    this.subscription = this.postService.get().subscribe(
      p => console.log(p)
    );
  }
  openDialog() {
    const dialogRef = this.dialog.open(NewPostFormComponent)
    this.isOpen = !this.isOpen;    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
