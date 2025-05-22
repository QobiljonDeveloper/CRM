const { addGroup, getAllGroups, getGroupOneById, removeGroup, updateGroup } = require("../controllers/group.controller");

const router = require("express").Router();

router.post("/", addGroup);
router.get("/", getAllGroups);
router.patch("/:id", updateGroup);
router.delete("/:id", removeGroup);
router.get("/:id", getGroupOneById);

module.exports = router;
