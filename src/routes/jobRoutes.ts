import { Router } from 'express';

import {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobControllers';

const router = Router();

router.route('/').get(getJobs).post(createJob);

router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

export default router;
