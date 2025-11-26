const pool = require("../config/database");

// Create a new user
exports.createUser = async (data) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash, role, department_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, role, department_id`,
    [
      data.name,
      data.email,
      data.password_hash,
      data.role,
      data.department_id
    ]
  );

  return result.rows[0];
};

// Find user by email
exports.findByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

// Optional: Find user by ID
exports.findById = async (id) => {
  const result = await pool.query(
    `SELECT id, name, email, role, department_id 
     FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};
