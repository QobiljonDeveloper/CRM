const { addStage, getAllStages, getStagesById, removeStage, updateStage } = require("../controllers/stage.controller");

const router = require("express").Router();

router.post("/", addStage);
router.get("/", getAllStages);
router.patch("/:id", updateStage);
router.delete("/:id", removeStage);
router.get("/:id", getStagesById);

module.exports = router;
