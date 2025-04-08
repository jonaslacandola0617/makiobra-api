import { Router } from 'express';

import JobController from '../controllers/jobController';

const router = Router();

router.route('/').get(JobController.findAll).post(JobController.create);

router
  .route('/:id')
  .get(JobController.findById)
  .put(JobController.update)
  .delete(JobController.delete);

export default router;
