const db = require("../config/db");

exports.getEmployees = async (req, res) => {

  const [employees] = await db.execute(
    "SELECT * FROM employees"
  );

  res.json(employees);
};

exports.getEmployeeById = async (req, res) => {

  const [employees] = await db.execute(
    "SELECT * FROM employees WHERE id=?",
    [req.params.id]
  );

  res.json(employees[0]);
};

exports.createEmployee = async (req, res) => {

  const {
    first_name,
    last_name,
    department,
    salary
  } = req.body;

  await db.execute(
    `
    INSERT INTO employees
    (
      first_name,
      last_name,
      department,
      salary
    )
    VALUES (?,?,?,?)
    `,
    [
      first_name,
      last_name,
      department,
      salary
    ]
  );

  res.status(201).json({
    message: "Employee Created"
  });
};

exports.updateEmployee = async (req, res) => {

  const {
    first_name,
    last_name,
    department,
    salary
  } = req.body;

  await db.execute(
    `
    UPDATE employees
    SET
      first_name=?,
      last_name=?,
      department=?,
      salary=?
    WHERE id=?
    `,
    [
      first_name,
      last_name,
      department,
      salary,
      req.params.id
    ]
  );

  res.json({
    message: "Employee Updated"
  });
};

exports.deleteEmployee = async (req, res) => {

  await db.execute(
    "DELETE FROM employees WHERE id=?",
    [req.params.id]
  );

  res.json({
    message: "Employee Deleted"
  });
};