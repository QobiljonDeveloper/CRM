const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addRole = async (req, res) => {
  try {
    const { name } = req.body;
    const newRole = await pool.query(
      `
                    INSERT INTO role (name) VALUES ($1) RETURNING *
                `,
      [name]
    );

    res.status(201).send(newRole.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await pool.query(`
    SELECT * FROM role
        `);
    res.status(200).send(roles.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getRoleOneById = async (req, res) => {
  let { id } = req.params;
  try {
    const role = await pool.query(
      `
                SELECT * FROM role WHERE id = $1
            `,
      [id]
    );

    res.status(200).send(role.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateRole = async (req, res) => {
  let { id } = req.params;
  try {
    const existingRole = await pool.query(
      `
            SELECT * FROM role WHERE id = $1
        `,
      [id]
    );

    if (existingRole.rows.length == 0) {
      return res.status(404).json({ message: "Role topilmadi" });
    }

    await pool.query(
      `
            UPDATE role SET name = $1 WHERE id = $2
        `,
      [req.body.name, id]
    );

    return res.status(200).json({
      id: id,
      message: "Role muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const removeRole = async (req, res) => {
  let { id } = req.params;
  try {
    const existingRole = await pool.query(
      `
            SELECT * FROM role WHERE  id = $1
        `,
      [id]
    );

    if (existingRole.rows.length == 0) {
      return res.status(404).json({ message: "Role topilmadi" });
    }

    await pool.query(
      `
            DELETE FROM role WHERE id = $1
        `,
      [id]
    );

    return res.status(200).json({
      id: id,
      message: "Role muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addRole,
  getAllRoles,
  getRoleOneById,
  removeRole,
  updateRole
};
