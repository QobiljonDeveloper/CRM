const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addBranch = async (req, res) => {
  try {
    const { name, address, call_number } = req.body;
    const newBranch = await pool.query(
      `
                    INSERT INTO branch (name,address,call_number) VALUES ($1,$2,$3) RETURNING *
                `,
      [name, address, call_number]
    );

    res.status(201).send(newBranch.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllBranches = async (req, res) => {
  try {
    const branches = await pool.query(`
    SELECT * FROM branch
        `);
    res.status(200).send(branches.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getBranchOneById = async (req, res) => {
  let { id } = req.params;
  try {
    const branch = await pool.query(
      `
                SELECT * FROM branch WHERE id = $1
            `,
      [id]
    );

    res.status(200).send(branch.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateBranch = async (req, res) => {
  let { id } = req.params;
  try {
    const existingBranchResult = await pool.query(
      `SELECT * FROM branch WHERE id = $1`,
      [id]
    );

    if (existingBranchResult.rows.length === 0) {
      return res.status(404).json({ message: "Branch topilmadi" });
    }

    const existingBranch = existingBranchResult.rows[0];

    const updatedName = req.body.name ?? existingBranch.name;
    const updatedAddress = req.body.address ?? existingBranch.address;
    const updatedCallNumber =
      req.body.call_number ?? existingBranch.call_number;

    await pool.query(
      `
          UPDATE branch
          SET name = $1, address = $2, call_number = $3
          WHERE id = $4
        `,
      [updatedName, updatedAddress, updatedCallNumber, id]
    );

    return res.status(200).json({
      id,
      message: "Branch muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const removeBranch = async (req, res) => {
  let { id } = req.params;
  try {
    const existingBranch = await pool.query(
      `
            SELECT * FROM branch WHERE  id = $1
        `,
      [id]
    );

    if (existingBranch.rows.length == 0) {
      return res.status(404).json({ message: "Branch topilmadi" });
    }

    await pool.query(
      `
            DELETE FROM branch WHERE id = $1
        `,
      [id]
    );

    return res.status(200).json({
      id: id,
      message: "Branch muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addBranch,
  getAllBranches,
  getBranchOneById,
  removeBranch,
  updateBranch,
};
