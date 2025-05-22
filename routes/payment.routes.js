const { addPayment, getAllPayments, getPaymentOneById, removePayment, updatePayment } = require("../controllers/payment.controller");

const router = require("express").Router();

router.post("/", addPayment);
router.get("/", getAllPayments);
router.patch("/:id", updatePayment);
router.delete("/:id", removePayment);
router.get("/:id", getPaymentOneById);

module.exports = router;
