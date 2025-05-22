const {
  addLid,
  getAllLid,
  updateLid,
  removeLid,
  getLidOneById,
} = require("../controllers/lid.controller");

const router = require("express").Router();

router.post("/", addLid);
router.get("/", getAllLid);
router.patch("/:id", updateLid);
router.delete("/:id", removeLid);
router.get("/:id", getLidOneById);

module.exports = router;
