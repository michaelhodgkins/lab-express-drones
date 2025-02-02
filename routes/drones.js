const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
    .then((allTheDronesFromDB) =>
      res.render('drones/list', {allTheDronesFromDB})
    )
    .catch((err) => `Could not find all drones: ${err}`);
});

router.get('/drones/create', (req, res, next) => res.render('drones/create-form'));
  // Iteration #3: Add a new drone
  // ... your code here

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const { name, propellers, maxSpeed } = req.body;

  Drone.create({ name, propellers, maxSpeed })
    .then(() => res.redirect('/drones'))
    .catch((err) => `Your drone cannot be made ${err}`);
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { id } = req.params;
  Drone.findById(id)
  .then((droneToEdit) => {
    res.render('drones/update-form', droneToEdit);
  })
  .catch((err) => `Couldn/t retrieve drone when trying to edit: ${err}`);
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here

  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;

  Drone.findByIdAndUpdate(
    id,
    { name, propellers, maxSpeed},
    { new: true }
  )
   .then(() => { res.redirect(`/drones`)})

   .catch((err) => console.log(`Error updating drone: ${err}`)
   );
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const { id } = req.params;

  Drone.findByIdAndDelete(id)
  .then(() => res.redirect('/'))
  .catch((err) => console.log(`Error when deleting drone: ${err}`));

});

module.exports = router;
