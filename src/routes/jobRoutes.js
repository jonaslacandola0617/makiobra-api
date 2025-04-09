const { Router } = require('express');

const JobController = require('../controllers/jobController');

const router = Router();

router.route('/').get(JobController.findAll).post(JobController.create);

router
  .route('/:id')
  .get(JobController.findById)
  .put(JobController.update)
  .delete(JobController.delete);

module.exports = router;
