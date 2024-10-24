const express = require("express");






const router = express.Router();


router.post("/createSSAdmin", userAndRoleController.createSSAdmin);
router.post(
  "/createSAdmin",
  adminAuthentication,
  roleSSAuthentication,
  userAndRoleController.createSAdmin
);
router.post(
  "/createAdmin",
  adminAuthentication,
  roleSAuthentication,
  userAndRoleController.createAdmin
);

router.post(
  "/deactivateAdmin/:userName",
  adminAuthentication,
  roleSAuthentication,
  userAndRoleController.deactivateAdmin
);

router.post(
  "/changePassword",
  adminAuthentication,
  roleSAuthentication,
  userAndRoleController.changePassword
);

router.post("/updateAdminStatus",adminAuthentication,roleSAuthentication, userAndRoleController.updateAdminStatus);

router.post("/updateAdminRoles",adminAuthentication,roleSAuthentication, userAndRoleController.updateAdminRoles);

router.post("/createRole", userAndRoleController.createRoles);
//router.post("/deleteRole", userAndRoleController.deleteRole);

router.post(
  "/getRolesList",
  adminAuthentication,
  userAndRoleController.getRolesList
);
module.exports = router;
