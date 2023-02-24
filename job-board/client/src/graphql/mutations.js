import { gql, request } from "graphql-request";

export async function createJob(job) {
  const mutation = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      createJob(job: $input) {
        id
        title
        description
        company {
          id
          name
        }
      }
    }
  `;
  const result = await request(mutation, { input: job });
  return result.job;
}
