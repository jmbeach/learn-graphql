import { useState } from "react";
import { useNavigate } from "react-router";
import { CREATE_JOB_MUTATION, JOB_QUERY } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import { getAccessToken } from "../auth";

function JobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [mutate] = useMutation(CREATE_JOB_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await mutate({
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
    });
    navigate(`/jobs/${data.job.id}`);
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                rows={10}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
