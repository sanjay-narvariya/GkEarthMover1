const express = require('express');
const router = express.Router();

const { createSubAdmin, getSubAdminByID, updateSubAdminByID, deleteSubAdminByID, getAllSubAdmin, AdminLogin, searchSubAdmins } = require("./adminlogin-controller");


router.post("/chk_admin_login", AdminLogin);






router.post("/create-sub-admin", createSubAdmin);

router.get("/get-sub-admin/:id", getSubAdminByID);

router.post("/update-sub-admin/:id", updateSubAdminByID);

router.post("/delete-sub-admin/:id", deleteSubAdminByID);

router.get("/get-all-sub-admin", getAllSubAdmin);

router.post("/search-sub-admins/:term", searchSubAdmins);

module.exports = router;