const db = require('./db');

const Query = {
  company: (root, args, context) => {
    console.log(context);
    db.companies.get(args.id);
  },
  job: (root, args) => db.jobs.get(args.id),
  jobs: () => db.jobs.list()
}

const Mutation = {
  createJob: (root, {input}) => {
    const id = db.jobs.create(input);
    return db.jobs.get(id)
  },
}

const Job = {
  company: (job) => db.companies.get(job.companyId)
};

module.exports = { Query, Job, Mutation };