import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TopicModel } from 'src/app/topic/topic-response';
import { TopicService } from 'src/app/topic/topic.service';


@Component({
  selector: 'app-topic-side-bar',
  templateUrl: './topic-side-bar.component.html',
  styleUrls: ['./topic-side-bar.component.css']
})
export class TopicSideBarComponent implements OnInit{

  topics: Array<TopicModel> = [];
  displayViewAll: boolean;

  constructor(private topicService : TopicService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchTopics();
  }

  private fetchTopics() {
    this.topicService.getAllTopics().subscribe((data) => {
      if (data.length > 5) {
        this.topics = data.slice(0, 5); // Use slice to create a new array
        this.displayViewAll = true;
      } else {
        this.topics = data;
      }
    });
  }

  goToTopic(id: number): void {
    this.router.navigateByUrl('/view-topic/' + id);
  }

}
