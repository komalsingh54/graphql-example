import React, { useState, useEffect } from 'react';
import { JobList } from './JobList';
const { loadJobs } = require('./requests');

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (jobs.length < 1)
      loadJobs()
        .then((jobs) => {
          setJobs(jobs.jobs);
        });
    return () => {};
  })

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}
