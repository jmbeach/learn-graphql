import { gql, request } from "graphql-request";
import { GRAPHQL_URL } from './queries'

export async function createJob(job) {
  const query = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(job: $input) {
        id
      }
    }
  `;
  const result = await request(GRAPHQL_URL, query, { input: job });
  return result.job;
}