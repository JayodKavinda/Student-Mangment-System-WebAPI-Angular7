
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade } from 'src/app/shared/grade.model';
import { GradeService } from 'src/app/shared/grade.service';
import { StudentService } from 'src/app/shared/student.service';
import { StudentSubjectComponent } from '../student-subject/student-subject.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styles: []
})
export class StudentComponent implements OnInit {
  gradeList : Grade[];

  constructor(public service: StudentService, 
    public dialog:MatDialog,
    private gradeService: GradeService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit(){
    let studentID = this.currentRoute.snapshot.paramMap.get('id');
    if(studentID==null)
    this.resetForm();
    else{
     
      this.service.getStudentbyID(parseInt(studentID)).then(res =>{
          this.service.formData = res.student;
          this.service.studentsubjects = res.studentDetials;
      });
    }

    this.gradeService.getGradeList().then(res => this.gradeList = res as Grade[])
  }

  resetForm(form?:NgForm){
    if(form=null)
      form.resetForm();
    this.service.formData = {
      StudentID : null,
      RegNo : '',
      FirstName : '',
      LastName : '',
      GradeID:0,
      TMarks : 0,
      DeletedStudentSubjectIDs : ''


    }
    this.service.studentsubjects =[];


  }

  AddOrEditstudentSubject(studentsubjectsIndex, StudentID){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    dialogConfig.data = {studentsubjectsIndex, StudentID};
    this.dialog.open(StudentSubjectComponent, dialogConfig).afterClosed().subscribe(res=>{
      this.updateTotalMarks();
    });
  }

  onDeleteStudentSubject(studentSubjectID:number, i:number){
    if(studentSubjectID!=null)
    this.service.formData.DeletedStudentSubjectIDs += studentSubjectID+ ","
    this.service.studentsubjects.splice(i,1);
    this.updateTotalMarks();
  }

  updateTotalMarks(){
    this.service.formData.TMarks =this.service.studentsubjects.reduce((prev,curr)=>{
      return +prev + +curr.Marks;
    },0);
    this.service.formData.TMarks = parseFloat(this.service.formData.TMarks.toFixed(2));
  }

  onSubmit(form:NgForm){
      this.service.saveOrUpdateStudent().subscribe(res=> { 
        this.resetForm();
        this.router.navigate(['/students'])
       })
  }
}
