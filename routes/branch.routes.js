const { addBranch, getAllBranches, getBranchOneById, removeBranch, updateBranch } = require("../controllers/branch.controller");

const router = require("express").Router();

router.post("/", addBranch);
router.get("/", getAllBranches);
router.patch("/:id", updateBranch);
router.delete("/:id", removeBranch);
router.get("/:id", getBranchOneById);

module.exports = router;
