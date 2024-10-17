const express = require("express");
const { loginAdmin, logoutAdmin } = require("../../controllers/admin/auth.controller");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", checkAuth, authorize(role.admin), logoutAdmin);

module.exports = router;
