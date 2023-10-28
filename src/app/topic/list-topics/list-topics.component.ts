import { Component, OnInit } from '@angular/core';
import { TopicModel } from '../topic-response';
import { TopicService } from '../topic.service';
import { throwError } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-topics',
  templateUrl: './list-topics.component.html',
  styleUrls: ['./list-topics.component.css']
})
export class ListTopicsComponent implements OnInit {

  topics: Array<TopicModel>;
  name: string;
  faComments = faComments;
  userSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private topicService: TopicService) {
    this.userSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.fetchTopics();
    });
  }

  ngOnInit() {
    /*if (this.name === undefined)
    {
      this.topicService.getAllTopics().subscribe(data => {
        this.topics = data;
      }, error => {
        throwError(error);
      });
      console.log("Name is undefined ");
    }
    else
      this.searchTopic();*/

  }

  searchTopic(){
    this.topicService.getTopicsByTopicName(this.name).subscribe(topic => {
      this.topics = topic;
    });
  }

  private fetchTopics() {
    this.name = this.activatedRoute.snapshot.params['name'];

    if (this.name === undefined)
    {
      this.topicService.getAllTopics().subscribe(data => {
        this.topics = data;
      }, error => {
        throwError(error);
      });
      console.log("Name is undefined ");
    }
    else
      this.searchTopic();
  }

  ngOnDestroy(): void {
    // Unsubscribe from any active subscriptions to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
