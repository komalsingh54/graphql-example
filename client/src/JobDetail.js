import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { getJob } from './requests';

export const JobDetail = (props) => {
  const { params: { jobId }} = useRouteMatch();
  const [job, setJob] = useState(null);

  useEffect(async () => {
    function fetchData(jobId) {
      getJob(jobId).then((jobDetail) => {
        setJob(jobDetail.job);
      });
    }
    fetchData(jobId);
    return () => {};
  }, [jobId])

  if (job) {
    return (
      <div>
        <h1 className="title">{job.title}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className="box">{job.description}</div>
      </div>
    );
  }
  else return (<div>Loading</div>);
};
