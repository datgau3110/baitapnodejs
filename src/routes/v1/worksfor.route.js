const express = require('express');

const peopleController = require('../../controllers/people.controller');

const router = express.Router();

router
  .route('/')
  .post( peopleController.createPeople)
  .get( peopleController.getPeoples);

router
  .route('/:peopleId')
  .get(peopleController.getPeople)
  .patch( peopleController.updatePeople)
  .delete( peopleController.deletePeople);

module.exports = router;


