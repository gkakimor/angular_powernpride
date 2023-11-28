import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import { AuthService } from '../auth/shared/auth.service';
import { TopicService } from '../topic/topic.service';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { DashboardPayload } from '../dashboard/dashboard.payload';
import { faComments, faPenToSquare, faUser, faMessage } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean;
  posts: Array<PostModel> = [];
  dash: DashboardPayload;
  faComments  = faComments;
  faPenToSquare = faPenToSquare;
  faUser = faUser;
  faMessage = faMessage;


  constructor(private postService: PostService, private authService: AuthService, private dashboardService: DashboardService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    });
    this.dashboardService.getAllNumbers().subscribe( dash => {
      this.dash = dash;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
  }

}
