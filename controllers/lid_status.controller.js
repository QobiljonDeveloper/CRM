const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addLidStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const newLidStatus = await pool.query(
      `
        INSERT INTO lid_status (status) 
        VALUES ($1) RETURNING *
        `,
      [status]
    );
    console.log(newLidStatus);

    res.status(201).send(newLidStatus.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllLidStatus = async (req, res) => {
  try {
    const newLidStatus = await pool.query(`
    SELECT * FROM lid_status
        `);
    res.status(200).send(newLidStatus.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getLidStatusById = async (req, res) => {
  let { id } = req.params;

  try {
    const newLidStatusById = await pool.query(
      `
        SELECT * FROM lid_status WHERE id = $1 
        `,
      [id]
    );
    res.status(200).send(newLidStatusById.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateLidStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const existingLidStatus = await pool.query(
      `SELECT * FROM lid_status WHERE id = $1`,
      [id]
    );

    if (existingLidStatus.rows.length === 0) {
      return res.status(404).json({ message: "Lid status topilmadi" });
    }

    await pool.query(
      `UPDATE lid_status SET status = $1 WHERE id = $2`,
      [req.body.status, id]
    );

    return res.status(200).json({
      id: id,
      message: "Lid status muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const removeLidStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const existingLidStatus = await pool.query(
      `SELECT * FROM lid_status WHERE id = $1`,
      [id]
    );

    if (existingLidStatus.rows.length === 0) {
      return res.status(404).json({ message: "Lid status topilmadi" });
    }

    await pool.query(`DELETE FROM lid_status WHERE id = $1`, [id]);

    return res.status(200).json({
      id: id,
      message: "Lid status muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addLidStatus,
  getAllLidStatus,
  getLidStatusById,
  updateLidStatus,
  removeLidStatus,
};
