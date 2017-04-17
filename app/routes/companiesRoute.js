const Router = require('./Router');

const companies = new Router('companies');

/**
 * @api {get} /companies GetCompanies
 * @apiName GetCompanies
 * @apiGroup Companies
 *
 */
companies.get('/', (req, res, next) => {
  const data = {
    companies: ['HELLO'],
  };
  res.json(data);
});

module.exports = companies;
