import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreatePostPayload } from './create-post.payload';
import { TopicModel } from 'src/app/topic/topic-response';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/topic/topic.service';
import { PostService } from 'src/app/shared/post.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  topics: Array<TopicModel>;

  constructor(private router: Router, private postService: PostService,
    private topicService: TopicService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      topicName: ''
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      topicName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.topicService.getAllTopics().subscribe((data) => {
      this.topics = data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.topicName = this.createPostForm.get('topicName')?.value;
    this.postPayload.url = this.createPostForm.get('url')?.value;
    this.postPayload.description = this.createPostForm.get('description')?.value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
}
