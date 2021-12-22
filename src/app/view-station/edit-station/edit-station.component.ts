import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Places } from 'src/app/Places';


@Component({
  selector: 'app-edit-station',
  templateUrl: './edit-station.component.html',
  styleUrls: ['./edit-station.component.css']
})
export class EditStationComponent implements OnInit {
   
  @Input() Name: string;  
  @Output() getResponse = new EventEmitter; 

  @Input() msgFromParent1: any[];

  // @Input() passChailData: string; 

  tripServiceObject: any;
  displayhomeStation = true;
  data: any;
  place: Places = new Places();
  constructor() { }

  ngOnInit() {
  }

  editStation(station){
    console.log(this.place);
    this.getResponse.emit(station)
    this.tripServiceObject.updateStation(this.place).subscribe(
      data => {
        this.data=data;
        console.log(data);
    }
    )
  }

    backFunc(){ 
      window.location.reload();
  
      }
  }

