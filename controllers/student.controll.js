const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addStudent = async (req, res) => {
  try {
    const {
    lid_id,
    first_name,
    last_name,
    phone_number,
    birthday,
    gender,
    } = req.body;
    const newStudent = await pool.query(
      `
                    INSERT INTO "students" (lid_id,first_name,last_name,phone_number,birthday,gender) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
                `,
      [lid_id,first_name,last_name,phone_number,birthday,gender]
    );

    res.status(201).send(newStudent.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await pool.query(`
    SELECT * FROM "students"
        `);
    res.status(200).send(students.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStudentOneById = async (req, res) => {
  let { id } = req.params;
  try {
    const student = await pool.query(
      `
                SELECT * FROM "students" WHERE id = $1
            `,
      [id]
    );

    res.status(200).send(student.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStudent = async (req, res) => {
  let { id } = req.params;
  try {
    const existingStudentResult = await pool.query(
      `SELECT * FROM "students" WHERE id = $1`,
      [id]
    );

    if (existingStudentResult.rows.length === 0) {
      return res.status(404).json({ message: "Student topilmadi" });
    }

    const existingStudent = existingStudentResult.rows[0];

    const updatedLidId = req.body.lid_id ?? existingStudent.lid_id;
    const updatedFirstName = req.body.first_name ?? existingStudent.first_name;
    const updatedLastName = req.body.last_name ?? existingStudent.last_name;
    const updatedPhoneNumber = req.body.phone_number ?? existingStudent.phone_number;
    const updatedBirthday = req.body.birthday ?? existingStudent.birthday;
    const updatedGender = req.body.gender ?? existingStudent.gender;

    await pool.query(
      `
          UPDATE "students"
          SET lid_id = $1, first_name = $2, last_name = $3, phone_number = $4, birthday = $5, gender = $6
          WHERE id = $7
        `,
      [updatedLidId, updatedFirstName, updatedLastName, updatedPhoneNumber, updatedBirthday, updatedGender, id]
    );

    return res.status(200).json({
      id,
      message: "Student muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const removeStudent = async (req, res) => {
  let { id } = req.params;
  try {
    const existingStudent = await pool.query(
      `
            SELECT * FROM "students" WHERE  id = $1
        `,
      [id]
    );

    if (existingStudent.rows.length == 0) {
      return res.status(404).json({ message: "Student topilmadi" });
    }

    await pool.query(
      `
            DELETE FROM "students" WHERE id = $1
        `,
      [id]
    );

    return res.status(200).json({
      id: id,
      message: "Student muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentOneById,
  removeStudent,
  updateStudent,
};
