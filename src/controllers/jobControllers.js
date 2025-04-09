const JobServices = require('../services/jobServices');

class JobControllers {
  async findAll(req, res) {
    const result = await JobServices.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  }

  async findById(req, res) {
    const { id } = req.params;

    const result = await JobServices.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  }

  async create(req, res) {
    const job = req.body;

    const result = await JobServices.create(job);

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

    const result = await JobServices.update(id, job);

    res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const result = await JobServices.delete(id);

    res.status(204).json({
      status: 'success',
      data: {
        result,
      },
    });
  }
}

module.exports = new JobControllers();
