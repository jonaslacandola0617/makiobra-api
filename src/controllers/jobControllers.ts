import { Request, Response } from 'express';
import { ParsedQs } from 'qs';
import { Job } from '@prisma/client';

import prisma from '../prisma';

export async function getJobs(req: Request, res: Response) {
  /*
      sort: { asc: salary }
      fields: "jobTitle,salary,description"
      page: 5
      limit: 10
      filter
  */
  let query: Record<string, any> = {};

  // FILTER
  const filter = req.query;
  const excludedQueries = ['sort', 'page', 'limit', 'fields'];

  excludedQueries.forEach((el) => delete filter[el]);

  Object.keys(filter).forEach((field) => {
    const value = filter[field];

    // CHECK IF THE VALUE IS A STRING AND IS NOT A NUMBER (NAN)
    if (typeof value === 'string') {
      // IF IT'S A STRING, MUTATE TO AN ACCEPTABLE PRISMA QUERY
      // THIS WILL BE MOSTLY USED FOR SEARCH FUNCTIONS
      if (Number.isNaN(Number(value)))
        filter[field] = { contains: value, mode: 'insensitive' };
      else (filter as Record<string, any>)[field] = Number(value);
    } else if (typeof value === 'object' && value !== null) {
      Object.keys(value).forEach((key) => {
        const nestedValue = (value as ParsedQs)[key];
        (value as Record<string, any>)[key] = Number(nestedValue);
      });
    }
  });

  query = { ...query, where: filter };

  //  SORT
  if (req.query.sort) {
    const { sort } = req.query;
    const entries = [[Object.values(sort)[0], Object.keys(sort)[0]]];

    query = { ...query, orderBy: Object.fromEntries(entries) };
  }

  //  SELECT FIELDS
  if (req.query.fields) {
    const { fields } = req.query;

    if (typeof fields === 'string') {
      const selectedFields = fields
        .split(',')
        .map((field) => [field.trim(), true]);

      query = { ...query, select: Object.fromEntries(selectedFields) };
    }
  }

  //  PAGINATE AND LIMIT

  const jobs = await prisma.job.findMany(Object(query));

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
