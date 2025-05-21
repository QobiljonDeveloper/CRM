const { addReasonLid, getAllReasonLid, getReasonLidById, removeReasonLid, updateReasonLid } = require("../controllers/reason_lid.controller");

const router = require("express").Router();

router.post("/", addReasonLid);
router.get("/", getAllReasonLid);
router.patch("/:id", updateReasonLid);
router.delete("/:id", removeReasonLid);
router.get("/:id", getReasonLidById);

module.exports = router;
