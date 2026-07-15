const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password, roleId } = req.body;

    const [existing] = await db.execute(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `
      INSERT INTO users
      (username,email,password_hash)
      VALUES (?,?,?)
      `,
      [username, email, hashedPassword]
    );

    await db.execute(
      `
      INSERT INTO user_roles
      (user_id,role_id)
      VALUES (?,?)
      `,
      [result.insertId, roleId || 3]
    );

    res.status(201).json({
      message: "User Registered Successfully"
    });

  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const [users] = await db.execute(
      `
      SELECT
      u.*,
      r.role_name
      FROM users u
      JOIN user_roles ur
      ON u.id=ur.user_id
      JOIN roles r
      ON ur.role_id=r.id
      WHERE u.email=?
      `,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }

    const user = users[0];

    const match = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!match) {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role_name
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    await db.execute(
      `
      INSERT INTO tokens
      (user_id,token,expires_at)
      VALUES
      (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))
      `,
      [user.id, token]
    );

    await db.execute(
      `
      INSERT INTO login_history
      (user_id,ip_address)
      VALUES (?,?)
      `,
      [user.id, req.ip]
    );

    res.json({
      message: "Login Success",
      token
    });

  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.logout = async (req, res) => {

  const token =
    req.headers.authorization.split(" ")[1];

  await db.execute(
    `
    UPDATE tokens
    SET status='REVOKED'
    WHERE token=?
    `,
    [token]
  );

  res.json({
    message: "Logout Successful"
  });
};