import { Job, Company, User } from "./db.js";
export const resolvers = {
  Query: {
    company: (_root, { id }) => Company.findById(id),
    job: (_root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },
  Mutation: {
    createJob: async (_root, { job }, { user }) => {
      if (!user) {
        throw new Error("Unauthorized");
      }
      return await Job.create({ ...job, companyId: user.companyId });
    },
    deleteJob: async (_root, { id }, { user }) => {
      const job = await Job.findById(id);
      if (!user || job.companyId !== user.companyId) {
        throw new Error("Unauthorized");
      }
      await Job.delete(id);
      return id;
    },
    updateJob: async (_root, { job }, { user }) => {
      const match = await Job.findById(job.id);
      if (
        !user ||
        match.companyId !== user.companyId
      ) {
        throw new Error("Unauthorized");
      }
      return await Job.update({...job, companyId: user.companyId});
    },
  },
  Job: {
    company: (job) => Company.findById(job.companyId),
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
};
