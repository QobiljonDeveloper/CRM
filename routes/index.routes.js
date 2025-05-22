const stageRouter = require("./stage.routes");
const lidStatusRouter = require("./lid_status.routes");
const reasonLidRouter = require("./reason_lid.routes");
const roleRouter = require("./role.routes");
const branchRouter = require("./branch.routes");
const groupRouter = require("./group.routes");
const deviceTokenRouter = require("./device_token.routes");
const lidRouter = require("./lid.routes");
const targetRouter = require("./target.routes");
const paymentRouter = require("./payment.routes");
const studentRouter = require("./student.routes");

const router = require("express").Router();

router.use("/stage", stageRouter);
router.use("/lid-status", lidStatusRouter);
router.use("/reason-lid", reasonLidRouter);
router.use("/role", roleRouter);
router.use("/branch", branchRouter);
router.use("/group", groupRouter)
router.use("/device", deviceTokenRouter);
router.use("/lid", lidRouter);
router.use("/target", targetRouter);
router.use("/payment", paymentRouter);
router.use("/student", studentRouter);

module.exports = router;
