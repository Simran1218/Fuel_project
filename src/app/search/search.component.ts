import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cordinate } from '../cordinate';
import { TripService } from '../service/trip.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  massege = "Top 3 Stations";
  displayViewStation: boolean;
  displayAddStation: boolean;
  tripServiceObject: any;
  displaySearch: any;
  title = "Find the nearest station"
  data: any;
  value: any;
  cordinate :any;
  form: FormGroup = new FormGroup({});
  xerror: any = false;
  xmessage:any ="Enter  Only Valid Number For X";
  yerror: any = false;
  ymessage: any="Enter Only Valid Numebr For Y ";
  showtable: any = false;
  corerror: any = false;
  cormessage: any ="Enter Valid coordinate For X and Y";
  constructor(public tripService: TripService, private formBuilder: FormBuilder ) { 
    this.form = formBuilder.group({
      xnumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      ynumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    })
  }
  ngOnInit() {
  }


  get f(){
    return this.form.controls;
  }
  viewStationMethod(){
    this.displayViewStation=true;
    this.displayAddStation=false;
  }
  addStationMethod(){
   this.displayViewStation=false;
   this.displayAddStation=true;
 }
 onSearch(x_cordinate:any , y_cordinate:any){
  this.yerror= false;
  this.xerror=false;
  // debugger;

  if(isNaN(x_cordinate)){
    this.xerror = true;
    // this.yerror = false;
    return;
  }else{
    if(Number(x_cordinate) <= 180 && Number(x_cordinate) >= -180){
      console.log("X cordinate is valid number")
    }else{
      this.xerror = true;
      return;
    }
  }

  this.xerror=false;
  if (isNaN(y_cordinate)){
    this.yerror = true;
    // this.xerror = false;
    return;
  }else{
    if(Number(y_cordinate) <= 180 && Number(y_cordinate) >= -180){
      console.log("y cordinate is valid number")
    }else{
      this.yerror = true;
      return;
    }
  }
  this.yerror= false;
  
  this.cordinate = new Cordinate(Number(x_cordinate),Number(y_cordinate)); 
  this.tripService.postNearestStatonAll(this.cordinate).subscribe(
    
    data => {
      this.data=data;
      console.log(data);  
      this.showtable = true;
      //console.log(Number(data)); 
  }
  ) 
}
  coridnateClass(coridnateClass: number) {
     
    throw new Error('Method not implemented.');
  }
}


//return File 
//? this.value.filter(element => element.type && element.type.toLowerCase().indexOf(File.toString().toLowerCase()) != -1) 
//: this.value;
