import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjectList(){
    return this.http.get(environment.apiURL+ '/Subject').toPromise();
  }
}
 