const Router = require('./Router');

const jobs = new Router('jobs');

/**
 * @api {get} /jobs GetJobs
 * @apiName GetJobs
 * @apiGroup Jobs
 *
 */
jobs.get('/', (req, res) => {
  res.send('jobs');
});

module.exports = jobs;
