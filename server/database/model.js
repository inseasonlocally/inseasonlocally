const { Pool } = require('pg');
const PG_URI = 'postgres://olpfyqxt:BzAd727B2CEGLeZqeqTAHCHrjlKCNgOR@salt.db.elephantsql.com/olpfyqxt';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

