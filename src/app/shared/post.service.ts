import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('https://power-n-pride-production.up.railway.app/api/posts');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('https://power-n-pride-production.up.railway.app/api/posts', postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('https://power-n-pride-production.up.railway.app/api/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('https://power-n-pride-production.up.railway.app/api/posts?username=' + name);
  }

  getAllPostsByTopic(id: number): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('https://power-n-pride-production.up.railway.app/api/posts?topicId=' + id);
  }
}
