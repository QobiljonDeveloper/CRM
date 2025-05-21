const { addLidStatus, getAllLidStatus, getLidStatusById, removeLidStatus, updateLidStatus } = require("../controllers/lid_status.controller");

const router = require("express").Router();

router.post("/", addLidStatus);
router.get("/", getAllLidStatus);
router.patch("/:id", updateLidStatus);
router.delete("/:id", removeLidStatus);
router.get("/:id", getLidStatusById);

module.exports = router;
