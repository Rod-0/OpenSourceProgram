import {Student} from '../models/student.model';
import { Component,OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {NgForm} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

studentData!: Student;
@ViewChild('studentForm',{static:false})
studentForm!: NgForm;

dataSource = new MatTableDataSource();
displayedColumns: string[] = ['id', 'name', 'age', 'mobile', 'email','address','age','action'];

@ViewChild(MatPaginator,{static:true})
paginator!: MatPaginator;
isEditMode = false;

@ViewChild(MatSort,{static:true})
sort!: MatSort;

onSubmit() {
  if(this.studentForm.form.valid){
    console.log('valid');
    if(this.isEditMode){
      let tempStudent = this.dataSource.data.find((student: any) => student.id === this.studentData.id);
      let index = this.dataSource.data.indexOf(tempStudent);
      this.dataSource.data[index] = this.studentForm.value;
      this.dataSource.data = this.dataSource.data;
      this.isEditMode = false;
    }else{
      this.dataSource.data.push(this.studentForm.value);
      this.dataSource.data = this.dataSource.data;
    }
    this.cancelEdit();

  }else{
    console.log('invalid');
  }
}

cancelEdit(){
  this.isEditMode = false;
  this.studentForm.resetForm();
}

ngOnInit() {  
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

}