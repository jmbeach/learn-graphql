import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getCompany } from "../graphql/queries";

function CompanyDetail() {
  const { companyId } = useParams();

  const [company, setCompany] = useState();
  useEffect(() => {
    (async () => {
      setCompany(await getCompany(companyId));
    })();
  }, [companyId, setCompany]);
  if (!company) return <p>Loading...</p>;
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
    </div>
  );
}

export default CompanyDetail;
