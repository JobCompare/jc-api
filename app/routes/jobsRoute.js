const Router = require('./Router');

const jobs = new Router('jobs');

/**
 * @api {get} /jobs GetJobs
 * @apiName GetJobs
 * @apiGroup Jobs
 *
 */
jobs.get('/', (req, res, next) => {
  const data = {
    jobs: ['WORLD'],
  };
  res.json(data);
});

module.exports = jobs;
