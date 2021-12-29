import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, MaxLengthValidator, Validators } from '@angular/forms';
import { isString } from 'util';
import { Places } from '../Places';
import { TripService } from '../service/trip.service';


@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css']
})
export class AddStationComponent implements OnInit {
  router: any;
  data: any;
  place: Places = new Places();
  submitted = false;
  displayhomeStation = true;
  allowNewServe = false;
  form: FormGroup = new FormGroup({});
  showerror: any = false;
  showmessage: any = "Enter valid data!!";
  private formSubmitAttempt: boolean;
  errorMsg:any;
  errorForm:boolean = false;
  xcordError:boolean =false;
  ycordError:boolean=false;
  message:any;
  fuelError:boolean;
  stCodeError: boolean;
  nameError:boolean;
  dataInsert:boolean;
  constructor(public tripServiceObject: TripService,  private formBuilder: FormBuilder ) { 
   
  }
  
  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   // name: ['', [Validators.required]],
    //   number: ['', [Validators.required]],
    //  latitude : ['',  [Validators.required]],
    //  longitude : ['',  [Validators.required]],
    // price: ['', [Validators.required]]
    // })
  }
 

  reset() {
    this.form.reset();
    this.formSubmitAttempt = false;
  }

  onSubmit(){
    debugger;
    this.errorForm=true;
    this.formSubmitAttempt = true;
    this.xcordError=false;
    this.ycordError=false;
    this.fuelError=false;
    this.stCodeError=false;
    this.nameError =false;
    if(!this.cordinateValidation(this.place.X_Coordinate)){
      this.xcordError=true;
    }
    
    if(!this.cordinateValidation(this.place.Y_Coordinate)){
      this.ycordError=true;
    }

    if(isNaN(this.place.Fuel_rate)){
      this.fuelError=true;
    }  
    
    if(isNaN(this.place.code)){
      this.stCodeError=true;
    }

    const addPlace = this.place.place_name;
    if(!isNaN(Number(addPlace))){
      this.nameError=true;
    //   if(addPlace == 0){
    //   this.dataInsert=true;
    // }
    }
    if(this.xcordError == true || this.ycordError == true || this.stCodeError==true || this.fuelError==true || this.nameError==true){
      return
    }else{
      this.xcordError=false;
      this.ycordError=false;
      this.fuelError=false;
      this.stCodeError=false;
      this.nameError=false;
      // this.dataInsert=false;
    }

    if (this.form.valid) {
      this.tripServiceObject.postNewStation(this.place).subscribe(data => {
        console.log(data)
        this.place = new Places();
      })
      this.showMessageSuccess();
      console.log('form submitted');
    } 
   
  }
  cordinateValidation(cordinates){
    if(Number(cordinates) <= 180 && Number(cordinates) >= -180){
      return true;
    }else{
      return false;
    }
  }


  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
    (this.form.get(field).untouched && this.formSubmitAttempt);
  }

  

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  get f(){
    return this.form.controls;
  }

  backFunc(){ 
    window.location.reload();

    }

    showMessageSuccess(){
        
      this.message = true;
      setTimeout(() => this.message=false, 2000);
    }

 }
function minLength(arg0: number) {
  throw new Error('Function not implemented.');
}

function snackBar(){
 
}