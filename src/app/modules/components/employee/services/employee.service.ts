import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export interface IEmployee {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _baseUrl = 'https://reqres.in/api/users';

  constructor(
    private _httpClient: HttpClient,
    private _httpClientA: HttpClient,
    private _httpClientb: HttpClient,
    private _httpClientc: HttpClient,
    private _httpClientd: HttpClient,
    private _httpCliente: HttpClient,
    private _httpClientf: HttpClient
  ) {

  }

  list(pageSize = 50): Observable<IEmployee[]> {
    const request = this._httpClient.get(`${this._baseUrl}?per_page=${pageSize}`).pipe(map((resp: any) => {
      return resp.data;
    }));

    return request;
  }

  listNew(): Observable<any> {
    return this._httpClient.get('https://reqres.in/user/usr').pipe(map(resp => {
      debugger;
      return resp;
    }), catchError(error => {
      debugger;
      throw error;
      // return of();
    }));
  }

  create(value: IEmployee): Observable<IEmployee> {
    const request = this._httpClient.post(this._baseUrl, value).pipe(map((resp: any) => {
      return resp;
    }));

    return request;
  }

  delete(value: number): Observable<boolean> {
    const request = this._httpClient.delete(`${this._baseUrl}/${value}`).pipe(map((resp: any) => {
      return true;
    }));

    return request;
  }
}
