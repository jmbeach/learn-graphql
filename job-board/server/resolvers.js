import { Job, Company } from "./db.js";
export const resolvers = {
  Query: {
    company: (_root, { id }) => Company.findById(id),
    job: (_root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },
  Job: {
    company: (job) => Company.findById(job.companyId),
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
};
