// Iteration #1
require('../db');
const { default: mongoose } = require('mongoose');
const Drone = require('../models/Drone.model');

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];


  Drone.create(drones)
    .then((dronesFromDB) => {
    console.log(`created ${dronesFromDB.length}`);
    mongoose.connection.close();
    })
    .catch((err) => 
    console.log(`An error has occured: ${err}`)
    );