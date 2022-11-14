const jwt = require('jsonwebtoken');

function authorize(req, res, next) {
  const token = req.get('token');

  if (!token) {
    next();
  } else {

    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = payload;
      next();
    } catch (err) {
      next(err);
    }
  }
}
module.exports = authorize;
