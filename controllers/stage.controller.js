const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const DeviceDetector = require("node-device-detector");
const DeviceHelper = require("node-device-detector/helper");


const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  osIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});

const addStage = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newStage = await pool.query(
      `
        INSERT INTO stage (name,description) 
        VALUES ($1,$2) RETURNING *
        `,
      [name, description]
    );
    console.log(newStage);

    res.status(201).send(newStage.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStages = async (req, res) => {
  try {
    const userAgent = req.headers["user-agent"];
    console.log(userAgent);

    const result = detector.detect(userAgent);

    console.log("result parse", result);
    console.log(DeviceHelper.isDesktop)
    
    const newStages = await pool.query(`
    SELECT * FROM stage
        `);
    res.status(200).send(newStages.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStagesById = async (req, res) => {
  let { id } = req.params;

  try {
    const newStageById = await pool.query(
      `
        SELECT * FROM stage WHERE id = $1 
        `,
      [id]
    );
    res.status(200).send(newStageById.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStage = async (req, res) => {
  const { id } = req.params;

  try {
    const existingStage = await pool.query(
      `SELECT * FROM stage WHERE id = $1`,
      [id]
    );

    if (existingStage.rows.length === 0) {
      return res.status(404).json({ message: "Stage topilmadi" });
    }

    await pool.query(
      `UPDATE stage SET name = $1, description = $2 WHERE id = $3`,
      [req.body.name, req.body.description, id]
    );

    return res.status(200).json({
      id: id,
      message: "Stage muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const removeStage = async (req, res) => {
  const { id } = req.params;

  try {
    a;
    const existingStage = await pool.query(
      `SELECT * FROM stage WHERE id = $1`,
      [id]
    );

    if (existingStage.rows.length === 0) {
      return res.status(404).json({ message: "Stage topilmadi" });
    }

    await pool.query(`DELETE FROM stage WHERE id = $1`, [id]);

    return res.status(200).json({
      id: id,
      message: "Stage muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStage,
  getAllStages,
  getStagesById,
  updateStage,
  removeStage,
};
