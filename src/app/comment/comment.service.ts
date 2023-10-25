import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private domain = '';

  constructor(private httpClient: HttpClient) {
    this.domain = environment.apiDomain;
  }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(this.domain + '/api/comments?postId=' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post(this.domain + '/api/comments', commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentPayload[]>(this.domain + '/api/comments?userName=' + name);
  }
}
