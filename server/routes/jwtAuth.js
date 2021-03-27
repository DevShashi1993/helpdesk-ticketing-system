const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//authorization
router.post("/register", validInfo, async (req, res) => {
  const { firstName, lastName, email, companyName, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const insertQry = `WITH company_insert AS (INSERT INTO company(comp_name) VALUES('${companyName}') RETURNING comp_id)
                      INSERT INTO users (first_name, last_name, company_id, email, password, created_on) VALUES
                      ('${firstName}', '${lastName}',(SELECT comp_id FROM company_insert), '${email}', '${bcryptPassword}', current_timestamp)
                      RETURNING user_id`;
    // console.log(insertQry);

    let newUser = await pool.query(insertQry);

    if (newUser.rows.length === 1) {
      return res.status(200).send("User registred sucessfully");
    }

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("User does not exist");
    }
    else {
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
  
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      const jwtToken = jwtGenerator(user.rows[0].user_id);
      const {user_id, first_name, last_name, company_id, email} = user.rows[0];
      return res.json({ user_id, first_name, last_name, company_id, email, jwtToken });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
