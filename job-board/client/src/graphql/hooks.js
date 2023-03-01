import { useQuery, useMutation } from "@apollo/client";
import { JOBS_QUERY, JOB_QUERY, COMPANY_QUERY, CREATE_JOB_MUTATION } from "./queries";
import { getAccessToken } from "../auth";

export function useJobs() {
  const { data, loading, errors } = useQuery(JOBS_QUERY, {
    fetchPolicy: "network-only",
  });
  return {
    jobs: data?.jobs,
    loading,
    errors,
  };
}

export function useJob(id) {
  const { data, loading, error } = useQuery(JOB_QUERY, {
    variables: { id },
  });
  return {
    job: data?.job,
    loading,
    error
  }
}

export function useCompany(id) {
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { id },
  });
  return {
    company: data?.company,
    loading,
    error
  }
}

export function useCreateJob() {
  const [mutate, { loading }] = useMutation(CREATE_JOB_MUTATION);
  const createJob = (title, description) => {
    return mutate({
      variables: {
        input: {
          title,
          description,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
      update: (cache, { data: { job } }) => {
        cache.writeQuery({
          query: JOB_QUERY,
          variables: { id: job.id },
          data: { job },
        });
      },
    })
  }
  return {
    createJob,
    loading
  }
}