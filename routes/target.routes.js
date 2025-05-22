const { addTarget, getAllTarget, getTargetOneById, removeTarget, updateTarget } = require("../controllers/target.controller");

const router = require("express").Router();

router.post("/", addTarget);
router.get("/", getAllTarget);
router.patch("/:id", updateTarget);
router.delete("/:id", removeTarget);
router.get("/:id", getTargetOneById);

module.exports = router;
