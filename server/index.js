require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');

const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/firefuze',
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware, express.json());

app.get('/api/header/limit/:limit', (req, res, next) => {
  const limit = Number(req.params.limit);
  const sql = `
  SELECT "imageurl", "productid"
  from "products"
  limit $1
  `;
  const params = [limit];
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err))
  ;
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
