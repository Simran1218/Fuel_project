import { Component, OnInit } from '@angular/core';
import { TripService } from '../service/trip.service';
import { ViewStationComponent } from '../view-station/view-station.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayViewStation = false;
  displayAddStation = false;
  displaySearch = true;
  displayhomeStation = true;


  title = "Find the nearest station"
  serveCreationStatus = 'No servewas created!';
  activeId = 1;
  serveStatus: string = 'offine';
  authService: any;
  data:any;
  value: any;
  // getServeStatus(){
  //   return this.serveStatus;
  // }

  constructor(public tripServiceObject: TripService) {
    // this.serveStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  // viewStation(){
  //   console.log("hi");
  //   this.tripServiceObject.getAll().subscribe(
  //     data => {
  //       this.data=data;
  //       console.log(data);
 
  //   }
  //   )}
    
  getcolor(){
    return this.serveStatus === 'online' ? 'Fuchsia' : 'DarkGrey';
  }

  ngOnInit(): void {
   }
   viewStationMethod(){
     this.displayViewStation=true;
     this.displayAddStation=false;
     this.displaySearch=false;
   }
   addStationMethod(){
    this.displayViewStation=false;
    this.displayAddStation=true;
    this.displaySearch=false;
  }
  // onCreateServe(){
  //   this.serveCreationStatus = 'is created!';
  // }

  // onView(){
  //   console.log("hi");
  //   this.tripServiceObject.getAll().subscribe(
  //     data => {
  //       this.data=data;
  //       console.log(data);
  //     }
  //   )
  // }

  addStation(station){
    this.authService.station();
    
  }

  getEmploye(id){
    console.log("hi");
    this.tripServiceObject.get(id).subscribe(
      data => {
        this.data=data;
        console.log(data);
      }
    )
  }

  onSearch(){
    console.log("Top 3 places is here");
    this.tripServiceObject.postAll().subscribe(
      data => {
        this.data=data;
        console.log(data);
        // this.getAllvaluesFromFiles();
        // console.log(this.getSubscribeData); // prints Undefined
        return File 
        ? this.value.filter(element => element.type && element.type.toLowerCase().indexOf(File.toString().toLowerCase()) != -1) 
        : this.value;
 
    }
    
    )
    
     
  }
 
//   transform(station: any, term: any): any {
//     if (term === undefined) return station;

//     return station.filter(function(Station) {
//         return Station.place_name.toLowerCase().includes(term.toLowerCase());
//     })
// }
  // getSubscribeData(getSubscribeData: any) {
  //   throw new Error('Method not implemented.');
  // }
  backFunc(){ 
    window.location.reload();
    }  
 
}
// function places_name(places_name: any) {
//   throw new Error('Function not implemented.');
// }

