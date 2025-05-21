const { addRole, getAllRoles, getRoleOneById, removeRole, updateRole } = require("../controllers/role.controller");

const router = require("express").Router();

router.post("/", addRole);
router.get("/", getAllRoles);
router.patch("/:id", updateRole);
router.delete("/:id", removeRole);
router.get("/:id", getRoleOneById);

module.exports = router;
