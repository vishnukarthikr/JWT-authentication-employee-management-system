const db = require("../config/db");

module.exports = async (req, res, next) => {

  const originalJson = res.json;

  res.json = function (data) {

    db.execute(
      `
      INSERT INTO api_logs
      (
        user_id,
        endpoint,
        request_method,
        ip_address,
        token_used,
        response_status
      )
      VALUES (?,?,?,?,?,?)
      `,
      [
        req.user?.userId,
        req.originalUrl,
        req.method,
        req.ip,
        req.headers.authorization,
        res.statusCode
      ]
    );

    return originalJson.call(this, data);
  };

  next();
};