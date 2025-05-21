const stageRouter = require("./stage.routes");
const lidStatusRouter = require("./lid_status.routes");
const reasonLidRouter = require("./reason_lid.routes");
const roleRouter = require("./role.routes");
const branchRouter = require("./branch.routes");
const router = require("express").Router();

router.use("/stage", stageRouter);
router.use("/lid-status", lidStatusRouter);
router.use("/reason-lid", reasonLidRouter);
router.use("/role", roleRouter);
router.use("/branch", branchRouter);

module.exports = router;
