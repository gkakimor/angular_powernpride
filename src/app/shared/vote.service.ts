import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotePayload } from './vote-button/vote-payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private domain = '';

  constructor(private http: HttpClient) {
    this.domain = environment.apiDomain;
  }

  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post(this.domain + '/api/votes', votePayload);
  }
}
