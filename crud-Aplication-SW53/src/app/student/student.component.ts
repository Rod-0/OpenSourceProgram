import {Student} from '../models/student.model';
import { Component,OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {NgForm} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { HttpDataService } from '../services/http-data.service';
import * as _ from "lodash";

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
      this.updateStudent()
    }else{
      console.log("create")
      this.addStudnet();
    }
    this.cancelEdit();

  }else{
    console.log('invalid');
  }
}
constructor(private httpDataService:HttpDataService){
  this.studentData = {} as Student;
}



ngOnInit():void{
  this.getAllStudent();
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

getAllStudent(){
  this.httpDataService.getList().subscribe((response:any)=>{
    this.dataSource.data = response;
  })
}

editItem(element:any){
  this.studentData = _.cloneDeep(element); //VALIDATE
  this.isEditMode = true;
}

cancelEdit(){
  this.isEditMode = false;
  this.studentForm.resetForm();
}

//delete
deleteItem(id:string){
  this.httpDataService.deleteItem(id).subscribe((response:any)=>{
    this.dataSource.data = this.dataSource.data.filter((o:any)=>{
      return o.id !== id ? o : false;
    });
  })

  console.log(this.dataSource.data)
}
//add
addStudnet(){
  this.httpDataService.createItrem(this.studentData).subscribe((response:any)=>{
    this.dataSource.data.push({...response});
    this.dataSource.data = this.dataSource.data.map((o:any)=>{
      return o;
    })
  })
}

//update
updateStudent(){
  this.httpDataService.updateItem(this.studentData.id,this.studentData).subscribe((response:any)=>{
    this.dataSource.data = this.dataSource.data.map((o:any)=>{
      if(o.id === response.id){
        o = response;
      }
      return o;
    })
  })
}
}
