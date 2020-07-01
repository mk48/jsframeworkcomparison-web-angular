import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class apiService {
  constructor(private httpClient: HttpClient) {}

  getCompanies(): Observable<any> {
    return this.httpClient.get('http://localhost:3001/companies');
  }
}
