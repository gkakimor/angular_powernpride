import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-topic',
  templateUrl: './view-topic.component.html',
  styleUrls: ['./view-topic.component.css']
})
export class ViewTopicComponent implements OnInit {

  posts: Array<PostModel> = [];
  postId: number;
  userSubscription: Subscription;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute) {
    this.userSubscription = this.activateRoute.params.subscribe((params: Params) => {
      this.fetchTopics();
    });
  }

  private fetchTopics() {
    this.postId = this.activateRoute.snapshot.params['id'];
    this.postService.getAllPostsByTopic(this.postId).subscribe(post => {
      this.posts = post;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Unsubscribe from any active subscriptions to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
