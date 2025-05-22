const { addStudent, getAllStudents, getStudentOneById, removeStudent, updateStudent } = require("../controllers/student.controll");

const router = require("express").Router();

router.post("/", addStudent);
router.get("/", getAllStudents);
router.patch("/:id", updateStudent);
router.delete("/:id", removeStudent);
router.get("/:id", getStudentOneById);

module.exports = router;
