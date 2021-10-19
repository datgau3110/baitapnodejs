const express = require('express');

const professionalController = require('../../controllers/professional.controller');

const router = express.Router();

router
  .route('/')
  .post( professionalController.createProfessional)
  .get( professionalController.getProfessionals);

router
  .route('/:professionalId')
  .get(professionalController.getProfessional)
  .patch( professionalController.updateProfessional)
  .delete( professionalController.deleteProfessional);

module.exports = router;


