import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{ FormsModule} from '@angular/forms'
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from "@angular/common/http";

import { StudentsComponent } from './students/students.component';
import { StudentComponent } from './students/student/student.component';
import { StudentSubjectComponent } from './students/student-subject/student-subject.component';
import { StudentService } from './shared/student.service';
import { isPromise } from '@angular/compiler/src/util';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentComponent,
    StudentSubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule

  ],
  entryComponents:[StudentSubjectComponent],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
