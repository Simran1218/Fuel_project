const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');


// new things

// app.use(express.json());

/**For connection 2 applicatio we need to have cros 
 * policy for that we need cors and the orign and port from which it will accept
 */
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:4200"
  };


app.use(cors(corsOptions));



app.use(bodyparser.json());



var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'account@123',
    database: 'demo',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


app.get('/viewStations', (req, res) => {
    
    mysqlConnection.query('SELECT * FROM station', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.get('/station/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM station WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.delete('/deleteStation/:id', (req, res) => {
    console.log("this is delete");
    console.log(req.params.id);
    var id = req.params.id;
    
     mysqlConnection.query('DELETE FROM station WHERE id = ?', [id], (err, rows, fields) => {
       console.log(err);
       console.log(rows.affectedRows);
    })
});



app.post('/nearestStations', (req, res) => {
    let userCoordinates = req.body;
    mysqlConnection.query('SELECT * FROM station', (err, rows, fields) => {
        if (!err) {
            for(i=0; i < rows.length; i++){
                let station = rows[i];
                let x_coordinate_station =  parseInt(station.x_coordinate);
                let y_coordinate_station =  parseInt(station.y_coordinate);
                let x_coordinate_user = parseInt(userCoordinates.x_coordinate);
                let y_coordinate_user = parseInt(userCoordinates.y_coordinate);
                lon1 = x_coordinate_user * Math.PI / 180;
                lon2 = x_coordinate_station * Math.PI / 180;
                lat1 = y_coordinate_user * Math.PI / 180;
                lat2 = y_coordinate_station * Math.PI / 180;
                let dlon = lon2 - lon1;
                let dlat = lat2 - lat1;
                let a = Math.pow(Math.sin(dlat / 2), 2)
                     + Math.cos(lat1) * Math.cos(lat2)
                    * Math.pow(Math.sin(dlon / 2),2);
               
                let c = 2 * Math.asin(Math.sqrt(a));
                let r = 6371;
   
                // calculate the result
                let distance = (c * r).toFixed(2) ;
                // return earth_radius * c;
                
            
                // let x_coordinate_difference = x_coordinate_user - x_coordinate_station;
                // let y_coordinate_difference = y_coordinate_user - y_coordinate_station;
                // let distance = Math.sqrt(x_coordinate_difference * x_coordinate_difference + y_coordinate_difference * y_coordinate_difference)
                station.distance_from_my_location = distance
            }
            let nearest_stations = rows.sort(function(a,b) {
                return parseFloat(a.distance_from_my_location - b.distance_from_my_location)
            });
           
            res.send(nearest_stations.slice(0,3))
        }
        else {
            console.log(err);
        }

        // function convertToNumber(numVal) {
  
        //     if (isNaN(+numVal)) {
        //       console.log("Number is NaN")
              
        //     } else  {
        //       console.log(+numVal)
        //     }
        //   }

        
        // for kelometers
        // let distance_from_my_location = rows.sort(function (a,b){
        //     return parseFloat( a.distance_from_my_location + b.distance_from_my_location * Math.PI / 180)
        // } );     
        // res.send(distance_from_my_location.length.parseFloat)
       
    })
    

});

app.post('/addStation', (req, res) => {
    console.log(req.body)
    var value = {place_name:req.body.place_name ,station_code:req.body.code ,x_coordinate:req.body.X_Coordinate,y_coordinate:req.body.Y_Coordinate ,Fuel_Rate:req.body.Fuel_rate};
    console.log(value);
    var sql = "INSERT INTo station SET ? ";
    
    mysqlConnection.query(sql, value, (err, rows, fields) => { 
    })
});


// app.put('/updateStation', (req, res) => {
//     let station = req.body;
//     var sql = "SET @ID = ?;SET @place_Name = ?;SET @Station_Code = ?;SET @x_coordinate = ?; \
//     CALL EmployeesAddOrEdit(@ID,@Place_name,@Station_Code,@x-coordinate,@y_coordinate,@Fuel_Rate);";
//     mysqlConnection.query(sql, [station.ID, station.place_name, station.station_Code, station.x_coordinate, station.y_coordinate, station.Fuel_Rate], (err, rows, fields)=> {
//         if (!err)
//             res.send('Updated successfully');
//         else
//             console.log(err);
//     })
// });


app.put('/updateStation', (req,res) => {
    console.log(req.body);
    var Fuel_Rate = req.body.Fuel_Rate;
    var placeName = req.body.place_name;
    // console.log(value);
    mysqlConnection.query( "UPDATE station SET Fuel_Rate = ? WHERE place_name = ? ", [Fuel_Rate,placeName], function (err, res) {
        if(err) {
            console.log('error');

        }else{   
            
            console.log("update Successfully ");
        }
    }); 
});





