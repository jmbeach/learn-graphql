import { Job, Company } from "./db.js";
export const resolvers = {
  Query: {
    company: (_root, { id }) => Company.findById(id),
    job: (_root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },
  Mutation: {
    createJob: (_root, { job }) => Job.create(job),
    deleteJob: async (_root, { id }) => {
      await Job.delete(id)
      return id;
    },
    updateJob: (_root, { job }) => Job.update(job)
  },
  Job: {
    company: (job) => Company.findById(job.companyId),
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
};
