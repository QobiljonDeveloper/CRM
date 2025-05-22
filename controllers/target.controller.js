const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addTarget = async (req, res) => {
  try {
    const { name } = req.body;
    const newTarget = await pool.query(
      `
                    INSERT INTO target (name) VALUES ($1) RETURNING *
                `,
      [name]
    );

    res.status(201).send(newTarget.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllTarget = async (req, res) => {
  try {
    const targets = await pool.query(`
    SELECT * FROM target
        `);
    res.status(200).send(targets.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getTargetOneById = async (req, res) => {
  let { id } = req.params;
  try {
    const target = await pool.query(
      `
                SELECT * FROM target WHERE id = $1
            `,
      [id]
    );

    res.status(200).send(target.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateTarget = async (req, res) => {
  let { id } = req.params;
  try {
    const existingTargetResult = await pool.query(
      `SELECT * FROM target WHERE id = $1`,
      [id]
    );

    if (existingTargetResult.rows.length === 0) {
      return res.status(404).json({ message: "Target topilmadi" });
    }

    const existingTarget = existingTargetResult.rows[0];

    const updatedName = req.body.name ?? existingTarget.name;
    await pool.query(
      `
          UPDATE target
          SET name = $1 
          WHERE id = $2
        `,
      [updatedName, id]
    );

    return res.status(200).json({
      id,
      message: "Target muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const removeTarget = async (req, res) => {
  let { id } = req.params;
  try {
    const existingTarget = await pool.query(
      `
            SELECT * FROM target WHERE  id = $1
        `,
      [id]
    );

    if (existingTarget.rows.length == 0) {
      return res.status(404).json({ message: "Target topilmadi" });
    }

    await pool.query(
      `
            DELETE FROM target WHERE id = $1
        `,
      [id]
    );

    return res.status(200).json({
      id: id,
      message: "Target muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addTarget,
  getAllTarget,
  getTargetOneById,
  removeTarget,
  updateTarget,
};
