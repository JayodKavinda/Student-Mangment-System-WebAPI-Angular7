import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../shared/student.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styles: []
})
export class StudentsComponent implements OnInit {

  studentList;

  constructor(private service : StudentService,
    private router: Router) { }

  ngOnInit(){
    this.refreshList();
  }

  refreshList(){
    this.service.getStudentList().then(res=> this.studentList = res );
  }
  openForEdit(studentID :number){
    this.router.navigate(['/student/edit/'+studentID ]);
  }

  onStudentDelete(id: number){
    if(confirm("Are you sure want to delete?")){
  this.service.deleteStudent(id).then( res =>{
      this.refreshList();
    });
  }
}
}
