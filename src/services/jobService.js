import prisma from '../prisma.js';

class JobService {
  async findAll() {
    const result = await prisma.job.findMany();
    console.log('burat');
    return result;
  }

  async findById(id) {
    const result = await prisma.job.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create(job) {
    const result = await prisma.job.create({
      data: {
        title: job.title,
        description: job.description,
        status: job.status,
        employerId: job.employerId,
      },
    });

    return result;
  }

  async update(id, job) {
    const result = await prisma.job.update({
      where: {
        id,
      },
      data: { ...job },
    });

    return result;
  }

  async delete(id) {
    const result = await prisma.job.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default new JobService();
