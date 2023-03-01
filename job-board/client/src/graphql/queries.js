import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { getAccessToken } from "../auth";
export const GRAPHQL_URL = "http://localhost:9000/graphql";

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const JOB_DETAIL_FRAGMENT = gql`
  fragment JobDetail on Job {
    id
    title
    description
    company {
      id
      name
    }
  }
`;

export const JOBS_QUERY = gql`
  query {
    jobs {
      id
      title
      company {
        name
      }
    }
  }
`;

const JOB_QUERY = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

export async function getJob(id) {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
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
  const variables = { id };
  const {
    data: { job },
  } = await client.query({ query, variables });
  return job;
}

export async function getCompany(id) {
  const query = gql`
    query CompanyQuery($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
          description
        }
      }
    }
  `;
  const {
    data: { company },
  } = await client.query({ query, variables: { id } });
  return company;
}

export async function createJob(input) {
  const mutation = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(job: $input) {
        ...JobDetail
      }
      ${JOB_DETAIL_FRAGMENT}
    }
  `;
  const variables = { input };
  const context = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  const {
    data: { job },
  } = await client.mutate({
    mutation,
    variables,
    context,
    update: (cache, { data: { job } }) => {
      cache.writeQuery({
        query: JOB_QUERY,
        variables: { id: job.id },
        data: { job },
      });
    },
  });
  return job;
}
