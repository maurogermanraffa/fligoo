/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable()
export class ApiBridgeService {
  constructor(private httpClient: HttpClient) { }

  get<T>(url: string, queryParams: any = null): Observable<T> {
    return this.httpClient.get<T>(env.api_url + url, { params: this.queryParamsResolve(queryParams) });
  }

  put<T>(url: string, queryParams: any = null): Observable<T> {
    return this.httpClient.put<T>(env.api_url + url, { params: this.queryParamsResolve(queryParams) });
  }

  delete<T>(url: string, queryParams: any = null): Observable<T> {
    return this.httpClient.delete<T>(env.api_url + url, { params: this.queryParamsResolve(queryParams) });
  }

  private queryParamsResolve(queryParams: any): HttpParams {
    let params = new HttpParams();
    if (queryParams) {
      return params = Object.getOwnPropertyNames(queryParams).reduce(
        (p, key) => p.set(key, queryParams[key]),
        new HttpParams()
      );
    }
    return params;
  }

}
