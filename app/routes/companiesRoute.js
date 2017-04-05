const Router = require('./Router');

const companies = new Router('companies');

/**
 * @api {get} /companies GetCompanies
 * @apiName GetCompanies
 * @apiGroup Companies
 *
 */
companies.get('/', (req, res) => {
  res.send('companies');
});

module.exports = companies;
