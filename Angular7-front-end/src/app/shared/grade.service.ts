import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient) { }

  getGradeList(){
    return this.http.get(environment.apiURL+ '/Grade').toPromise();
  }
}
