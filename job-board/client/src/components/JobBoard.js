import JobList from "./JobList";
import { JOBS_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/client";

function JobBoard() {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    fetchPolicy: "network-only",
  });
  if (error) {
    return <p>Sorry, something went wrong.</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={data.jobs} />
    </div>
  );
}

export default JobBoard;
