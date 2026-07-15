const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");

const auditMiddleware =
require("../middleware/auditMiddleware");

const employeeController =
require("../controllers/employeeController");

router.get(
  "/",
  authMiddleware,
  auditMiddleware,
  employeeController.getEmployees
);

router.get(
  "/:id",
  authMiddleware,
  auditMiddleware,
  employeeController.getEmployeeById
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin", "Manager"),
  auditMiddleware,
  employeeController.createEmployee
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin", "Manager"),
  auditMiddleware,
  employeeController.updateEmployee
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  auditMiddleware,
  employeeController.deleteEmployee
);

module.exports = router;