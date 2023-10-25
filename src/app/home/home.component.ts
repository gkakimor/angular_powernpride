import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import { AuthService } from '../auth/shared/auth.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TopicService } from '../topic/topic.service';
import { TopicModel } from '../topic/topic-response';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchTopicForm: FormGroup;
  isLoggedIn: boolean;
  faSearch = faSearch;
  posts: Array<PostModel> = [];
  searchTopicName = '';

  constructor(private postService: PostService, private authService: AuthService, private topicService: TopicService, private router: Router) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.searchTopicForm = new FormGroup({
      topicName: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  goToSearchTopic() {
    this.searchTopicName = this.searchTopicForm.get('topicName')?.value;
    this.router.navigateByUrl('/list-topics/' + this.searchTopicName);
  }
}
