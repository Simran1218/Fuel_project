import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, MaxLengthValidator, Validators } from '@angular/forms';
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

  constructor(public tripServiceObject: TripService,  private formBuilder: FormBuilder ) { 
   
  }
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required],],
      number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
     latitude : ['',  [Validators.required,Validators.pattern("^[0-9]*$")]],
     longitude : ['',  [Validators.required,Validators.pattern("^[0-9]*$")]],
    price: ['', [Validators.required,Validators.pattern("^[0-9]*$")]]
    })
  }
 

  reset() {
    this.form.reset();
    this.formSubmitAttempt = false;
  }

  onSubmit(){
    
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      debugger;
      this.tripServiceObject.postNewStation(this.place).subscribe(data => {
        console.log(data)
        this.place = new Places();
      })
      
      console.log('form submitted');
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

 }
function minLength(arg0: number) {
  throw new Error('Function not implemented.');
}

