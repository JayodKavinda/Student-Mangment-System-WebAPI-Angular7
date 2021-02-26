import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './students/student/student.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {path:'', redirectTo: 'students', pathMatch: 'full'},
  {path:'students',component:StudentsComponent},
  {path:'student', children:[
    {path:'', component: StudentComponent},
    {path:'edit/:id', component: StudentComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
