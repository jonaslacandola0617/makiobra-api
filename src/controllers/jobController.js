const JobService = require('../services/jobService');

class JobController {
  async findAll(req, res) {
    const result = await JobService.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  }

  async findById(req, res) {
    const { id } = req.params;

    const result = await JobService.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  }

  async create(req, res) {
    const job = req.body;

    const result = await JobService.create(job);

    res.status(201).json({
      status: 'success',
      data: {
        result,
      },
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const job = req.body;

    const result = await JobService.update(id, job);

    res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const result = await JobService.delete(id);

    res.status(204).json({
      status: 'success',
      data: {
        result,
      },
    });
  }
}

module.exports = new JobController();
