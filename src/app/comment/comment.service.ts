import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('https://power-n-pride-production.up.railway.app/api/comments?postId=' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post('https://power-n-pride-production.up.railway.app/api/comments', commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentPayload[]>('https://power-n-pride-production.up.railway.app/api/comments?userName=' + name);
  }
}
