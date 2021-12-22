import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cordinate } from '../cordinate';
// import { Places } from '../Places'

const viewStationUrl = 'http://localhost:3000/viewStations';
const addStationUrl = 'http://localhost:3000/addStation';
const nearestStationUrl = 'http://localhost:3000/nearestStations';
const deleteStationUrl = 'http://localhost:3000/deleteStation/';
const updateStationUrl = 'http://localhost:3000/updateStation';
// export class Places{
//   Id: string;
//   place_name: string;
//   station_cade: number;
//   x-coordinate: string;
//   y-coordinate: string;
//   Fuel_rate: number,
// }

// const jsonData = {
//   "station": {
//       "place":[
//         {
//           "Id": "1",
//           "place_name": "abc",
//           "cade": "44",
//           "x-coordinate": "19",
//           "y-coordinate": " 27",
//           "fuel_rate": " 100",
       
//         }
//       ] 
//     }
//   }

//   const datasource = jsonData.station.place;
  const displayColumne = ['id', 'place_name', 'code', 'x-coordinate', 'y-coordinate', 'fuel_rate'];

@Injectable({
  providedIn: 'root'
})
export class TripService {
  url: string;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(viewStationUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${viewStationUrl}/${id}`);
  }


  create(data): Observable<any> {
    return this.http.post(viewStationUrl, data);
  }

  postAll(): Observable<any>{
    return this.http.post<any>(nearestStationUrl,'');
    
  }

  postNearestStatonAll(cordinate): Observable<any>{
    return this.http.post(nearestStationUrl, cordinate);
  }

  postNewStation(data): Observable<any>{
    return this.http.post(addStationUrl, data);
  }
  // getPost(){
  //   return this.http.post(baseUrl)
  // }

  deleteStaionId(data): Observable<any>{
    // debugger;
      return this.http.delete(deleteStationUrl+data);
    }

    updateStation(data) {
      return this.http.put(updateStationUrl, data);
    }
 
 

}

