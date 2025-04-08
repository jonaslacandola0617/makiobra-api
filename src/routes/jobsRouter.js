import { Router } from "express";

import jobsController from "../controllers/jobsController"

const router = Router()

router.route('/')
    .get(jobsController.findAll())
    .post(jobsController.create())

router.route('/:id')
    .get(jobsController.findById())
    .put(jobsController.update())
    .delete(jobsController.delete())