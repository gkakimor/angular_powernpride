import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private domain = '';

  constructor(private http: HttpClient) {
    this.domain = environment.apiDomain;
  }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(this.domain + '/api/posts');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(this.domain + '/api/posts', postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(this.domain + '/api/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.domain + '/api/posts?username=' + name);
  }

  getAllPostsByTopic(id: number): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.domain + '/api/posts?topicId=' + id);
  }
}
