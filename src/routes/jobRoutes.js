const { Router } = require('express');

const JobControllers = require('../controllers/jobControllers');

const router = Router();

router.route('/').get(JobControllers.findAll).post(JobControllers.create);

router
  .route('/:id')
  .get(JobControllers.findById)
  .put(JobControllers.update)
  .delete(JobControllers.delete);

module.exports = router;
