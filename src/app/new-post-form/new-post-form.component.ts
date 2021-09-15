import { PostService } from './../post.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.sass']
})
export class NewPostFormComponent implements OnInit {

  constructor(public overlayContainer: OverlayContainer, private postService: PostService) {
      console.log(this.overlayContainer.getContainerElement().classList)
  }
  

  ngOnInit(): void {
  }
  
  save(form: any) {
    console.log(form);
   this.postService.update(form);
  }
}
