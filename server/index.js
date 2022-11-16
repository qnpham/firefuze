require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/firefuze',
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.get('/api/header/limit/:limit', (req, res, next) => {
  const limit = Number(req.params.limit);
  const sql = `
  SELECT "title","imageurl", "productid", "features", "supportkbm", "supportcontroller", "price"
  from "products"
  limit $1
  `;
  const params = [limit];
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err))
  ;
});

app.get('/api/game/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const sql = `
  SELECT *
  from "products"
  where "productid" = $1
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err))
  ;
});

app.get('/api/screenshots/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const sql = `
  SELECT "imageid", "imageurl"
  from "screenshots"
  where "productid" = $1
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err))
  ;
});

app.use(authorizationMiddleware, express.json());

app.post('/api/cart/token', (req, res, next) => {
  let token = req.get('token');
  if (!token) {
    createTokenAndCart();
  } else {
    try {
      const { cartid } = req.user;
      queryCart(cartid);
    } catch (err) {
      next(err);
    }
  }

  function createTokenAndCart() {
    const sql = `
    INSERT INTO "public"."carts" ("token")
    VALUES ($1)
    returning "cartid"
    `;
    const params = [null];
    db.query(sql, params)
      .then(result => {
        const { cartid } = result.rows[0];
        const payload = result.rows[0];
        token = jwt.sign(payload, process.env.TOKEN_SECRET);
        setToken(cartid, token);
      })
      .catch(err => next(err));
  }
  function setToken(cartId, newToken) {
    const sql = `
    UPDATE "public"."carts"
    SET "token" = $2
    WHERE "cartid" = $1
    returning "token"
    `;
    const params = [cartId, newToken];
    db.query(sql, params)
      .then(result => res.json(result.rows[0]))
      .catch(err => next(err));
  }
  function queryCart(cartId) {
    const sql = `
      SELECT "productid", "quantity", "title", "price", "imageurl"
      from "cartitems"
      join "products" using ("productid")
      where "cartid" = $1
      `;
    const params = [cartId];
    db.query(sql, params)
      .then(result => res.json(result.rows))
      .catch(err => next(err));
  }
});

app.post('/api/cart/add', (req, res, next) => {
  const { cartid } = req.user;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const sql = `
  INSERT INTO "cartitems" ("cartid", "productid", "quantity")
  VALUES ($1, $2, $3)
  `;
  const params = [cartid, productId, quantity];
  db.query(sql, params)
    .then(result => res.status(201).end())
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
