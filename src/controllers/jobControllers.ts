import { Request, Response } from 'express';
import prisma from '../prisma';
import { Job } from '@prisma/client';

export async function getJobs(req: Request, res: Response) {
  /*
      sort: { asc: salary }
      fields: "jobTitle,salary,description"
      page: 5
      limit: 10
  */
  let queryObj: Object = {};

  //  SORT
  if (req.query.sort) {
    const { sort } = req.query;
    const entries = [[Object.values(sort)[0], Object.keys(sort)[0]]];

    queryObj = { ...queryObj, orderBy: Object.fromEntries(entries) };
  }

  //  SELECT FIELDS
  if (req.query.fields) {
    const { fields } = req.query;

    if (typeof fields === 'string') {
      const selectedFields = fields
        .split(',')
        .map((field) => [field.trim(), true]);

      queryObj = { ...queryObj, select: Object.fromEntries(selectedFields) };
    }
  }

  //  PAGINATE AND LIMIT

  console.log(queryObj);

  const jobs = await prisma.job.findMany(queryObj);

  res.status(200).json({
    status: 'success',
    result: jobs.length,
    data: {
      jobs,
    },
  });
}

export async function getJob(req: Request, res: Response) {
  try {
    const job: Job = await prisma.job.findUniqueOrThrow({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: 'success',
      data: {
        job,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}

export async function createJob(req: Request, res: Response) {
  const job = await prisma.job.create({ data: req.body });

  res.status(201).json({
    status: 'success',
    data: {
      job,
    },
  });
}

export async function updateJob(req: Request, res: Response) {
  const job = await prisma.job.update({
    where: { id: req.params.id },
    data: req.body,
  });

  res.status(200).json({
    status: 'success',
    data: {
      job,
    },
  });
}

export async function deleteJob(req: Request, res: Response) {
  await prisma.job.delete({ where: { id: req.params.id } });

  res.status(204).json({
    status: 'success',
    data: null,
  });
}
