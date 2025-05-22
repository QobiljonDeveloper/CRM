const { addDevice, getAllDevices, getDeviceOneById, removeDevice, updateDevice } = require("../controllers/device.controller");

const router = require("express").Router();

router.post("/", addDevice);
router.get("/", getAllDevices);
router.patch("/:id", updateDevice);
router.delete("/:id", removeDevice);
router.get("/:id", getDeviceOneById);

module.exports = router;
