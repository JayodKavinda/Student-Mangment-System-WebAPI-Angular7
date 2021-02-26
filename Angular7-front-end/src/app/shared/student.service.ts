import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StudentSubject } from './student-subject.model';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  formData:Student;
  studentsubjects:StudentSubject[]
  
  constructor(private http:HttpClient) { }

  saveOrUpdateStudent(){
    var body ={
      ...this.formData,
      StudentSubjects : this.studentsubjects
    }
    return this.http.post(environment.apiURL+ '/Student',body)
  }
  getStudentList(){
    return this.http.get(environment.apiURL+ '/Student').toPromise();
  }

  getStudentbyID(id : number): any{
    return this.http.get(environment.apiURL+ '/Student/' + id).toPromise();
  }

  deleteStudent(id : number){
    return this.http.delete(environment.apiURL+ '/Student/' + id).toPromise();
  }
}
