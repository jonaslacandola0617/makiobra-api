import JobsService from "../services/jobsService";

class JobsController {
    async findAll(req, res) {
        const result = await JobsService.findAll()

        res.status(200).json({
            status: "success",
            data: {
                result
            }
        })
    }

    async findById(req, res) {
        const id = req.params.id

        const result = await JobsService.findById(id)

        res.status(200).json({
            status: "success",
            data: {
                result
            }
        })
    }

    async create(req, res) {
        const job = req.body

        const result = await JobsService.create(job)

        res.status(201).json({
            status: "success",
            data: {
                result
            }
        })
    }

    async update(req, res) {
        const id = req.params.id
        const job = req.body

        const result = await JobsService.update(id, job)

        res.status(200).json({
            status: "success",
            data: {
                result
            }
        })
    }

    async delete(req, res) {
        const id = req.params.id

        const result = await JobsService.delete(id)

        res.status(204).json({
            status: "success",
            data: {
                result
            }
        })
    }
}

export default new JobsController()