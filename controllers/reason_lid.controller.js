const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addReasonLid = async (req, res) => {
  try {
    const { reason_lid } = req.body;
    const newReasonLid = await pool.query(
      `
        INSERT INTO reason_lid (reason_lid) 
        VALUES ($1) RETURNING *
        `,
      [reason_lid]
    );
    console.log(newReasonLid);

    res.status(201).send(newReasonLid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllReasonLid = async (req, res) => {
  try {
    const newReasonLid = await pool.query(`
    SELECT * FROM reason_lid
        `);
    res.status(200).send(newReasonLid.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getReasonLidById = async (req, res) => {
  let { id } = req.params;

  try {
    const newReasonLidById = await pool.query(
      `
        SELECT * FROM reason_lid WHERE id = $1 
        `,
      [id]
    );
    res.status(200).send(newReasonLidById.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateReasonLid = async (req, res) => {
  const { id } = req.params;

  try {
    const existingReasonLid = await pool.query(
      `SELECT * FROM reason_lid WHERE id = $1`,
      [id]
    );

    if (existingReasonLid.rows.length === 0) {
      return res.status(404).json({ message: "Reason lid topilmadi" });
    }

    await pool.query(
      `UPDATE reason_lid SET reason_lid = $1 WHERE id = $2`,
      [req.body.reason_lid, id]
    );

    return res.status(200).json({
      id: id,
      message: "Reason lid muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const removeReasonLid = async (req, res) => {
  const { id } = req.params;

  try {
    const existingReasonLid = await pool.query(
      `SELECT * FROM reason_lid WHERE id = $1`,
      [id]
    );

    if (existingReasonLid.rows.length === 0) {
      return res.status(404).json({ message: "Reason lid topilmadi" });
    }

    await pool.query(`DELETE FROM reason_lid WHERE id = $1`, [id]);

    return res.status(200).json({
      id: id,
      message: "Reason lid muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addReasonLid,
  getAllReasonLid,
  getReasonLidById,
  updateReasonLid,
  removeReasonLid,
};
