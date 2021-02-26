import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';
import { Subject } from 'src/app/shared/Subject.model';
import { StudentSubject } from 'src/app/shared/student-subject.model';
import { SubjectService } from 'src/app/shared/subject.service';
import { NgForm } from '@angular/forms';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-student-subject',
  templateUrl: './student-subject.component.html',
  styles: []
})
export class StudentSubjectComponent implements OnInit {

  formData : StudentSubject;
  subjectList : Subject[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<StudentSubjectComponent>,
    public subjectService: SubjectService,
    public studentService : StudentService) { }

  ngOnInit() {
    this.subjectService.getSubjectList().then(res=> this.subjectList = res as Subject[])
    if(this.data.studentsubjectsIndex == null)
    this.formData={
      StudentSubjectID:null,
      StudentID :this.data.StudentID,
      SubjectID : 0,
      SubjectName:'',
      Marks :0


    }
    else
    this.formData=Object.assign({},this.studentService.studentsubjects[this.data.studentsubjectsIndex])
  

  
  } 

  onSubmit(form: NgForm) {
    if(this.data.studentsubjectsIndex == null)
      this.studentService.studentsubjects.push(form.value);
    else
    this.studentService.studentsubjects[this.data.studentsubjectsIndex] = form.value;
   this.dialogRef.close();
  }

}
