import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { getCompanyDetail } from './requests';

export const CompanyDetail = (props) => {
  const { params: { companyId } } = useRouteMatch();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchData(companyId) {
      const companyDetail = await getCompanyDetail(companyId);
      setCompany(companyDetail.company);
    }
    fetchData(companyId);
    return () => {};
  }, [companyId])

  if (!company) return "Loading...";

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
    </div>
  );
}
