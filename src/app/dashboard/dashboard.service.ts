import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { DashboardPayload } from './dashboard.payload';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private domain = '';

  constructor(private httpClient: HttpClient) {
    this.domain = environment.apiDomain;
  }

  getAllNumbers() {
    return this.httpClient.get<DashboardPayload>(this.domain + '/api/dashboard');
  }
}
