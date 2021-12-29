import { Component, OnInit } from '@angular/core';
import { Places } from '../Places';
import { TripService } from '../service/trip.service';

@Component({
  selector: 'app-view-station',
  templateUrl: './view-station.component.html',
  styleUrls: ['./view-station.component.css']
})
export class ViewStationComponent implements OnInit {

  data:any;
//  station: any;
// stations : any;
stations: any[] = [];
  router: any;
  apiService: any;
  view: any;
  displaydeleteStation =  false;
  displayeditStation = false;
  displayhomeStation = true;
  sendToEdit: any;
  name: any;
  currentMsgToChild1:any;
  enableEditIndex: any;
  enableEdit: boolean;
  edit:any =false;
  update: any = false;
  place: Places = new Places();
  index:any;
  fuel:any;
  deleteerror: any;
  deletemessage: any = false;
  editererror: boolean;
  editmessage: any =false;
  message:boolean;
  
  constructor(public tripServiceObject: TripService) {
    this.displayeditStation=false;

   }

  columns = ["id", "place_station", "x-coordinate", "y-coordinate", "Fuel_Rate" ];

  ngOnInit() {
    this.getEmploye();
  }
  
  deleteStation(stationData,index) {
    console.log(stationData);
    this.data.splice(index,1);
    this.tripServiceObject.deleteStaionId(stationData.id).subscribe(data=>{
       this.data=data;
       this.deleteerror = false;
     
     })
    this.showMessageSuccess();
  }

  editStation(station,index): void {
    this.edit=true;
    this.update=true;
    this.index=index;
    this.fuel=station.Fuel_Rate;
    console.log(station);
    this.sendToEdit = this.stations;
   
  };

  updateStation(stationdata){
    stationdata.Fuel_Rate = this.fuel;
    console.log(stationdata)
    this.tripServiceObject.updateStation(stationdata).subscribe(
      data => {
        this.data=data;
        console.log(data);
    }
    )
    
    this.editMessageSuccess() 
    
    this.edit=false;
    this.update=false;
    
  }

  


  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }

  getResponse($event) {  
    this.sendToEdit = $event;  
  }  
 
  
  getEmploye(){
    console.log("hi");
    this.tripServiceObject.getAll().subscribe(
      data => {
        this.data=data;
        console.log(data);
    }
    )}

    backFunc(){ 
      window.location.reload();
      }  

      showMessageSuccess(){
        
        this.message = true;
        setTimeout(() => this.message=false, 2000);
      }
      editMessageSuccess(){
        
        this.editmessage = true;
        setTimeout(() => this.editmessage=false, 2000);
      }

}




function input(input: any) {
  throw new Error('Function not implemented.');
}


