import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TopicModel } from './topic-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private domain = '';

  constructor(private http: HttpClient) {
    this.domain = environment.apiDomain;
  }

  getAllTopics(): Observable<Array<TopicModel>> {
    return this.http.get<Array<TopicModel>>(this.domain + '/api/topics');
  }

  createTopic(topicModel: TopicModel): Observable<TopicModel> {
    return this.http.post<TopicModel>(this.domain + '/api/topics', topicModel);
  }

  getTopicsByTopicName(topicName: String): Observable<Array<TopicModel>> {
    return this.http.get<Array<TopicModel>>(this.domain + '/api/topics?topicName=' + topicName);
  }
}
