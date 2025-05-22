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

const addDevice = async (req, res) => {
  try {
    const { user_id, token } = req.body;
    const userAgent = req.headers["user-agent"];
    console.log(userAgent);

    const result = detector.detect(userAgent);

   const {device,os,client} = result;

    const newDevice = await pool.query(
      `
                    INSERT INTO device_token (user_id,token,device,os,client) VALUES ($1,$2,$3,$4,$5) RETURNING *
                `,
      [user_id, token, device, os, client]
    );

    res.status(201).send(newDevice.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDevices = async (req, res) => {
  try {
    const devices = await pool.query(`
    SELECT * FROM device_token
        `);
    res.status(200).send(devices.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getDeviceOneById = async (req, res) => {
  let { id } = req.params;
  try {
    const device = await pool.query(
      `
                SELECT * FROM device_token WHERE id = $1
            `,
      [id]
    );

    res.status(200).send(device.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDevice = async (req, res) => {
  let { id } = req.params;
  try {
    const existingDeviceResult = await pool.query(
      `SELECT * FROM device_token WHERE id = $1`,
      [id]
    );

    if (existingDeviceResult.rows.length === 0) {
      return res.status(404).json({ message: "Device topilmadi" });
    }

    const existingDevice = existingDeviceResult.rows[0];

    const updatedUserId = req.body.user_id ?? existingDevice.user_id;
    const updatedToken = req.body.token ?? existingDevice.token;
    await pool.query(
      `
          UPDATE device_token
          SET user_id = $1, token = $2
          WHERE id = $3
        `,
      [updatedUserId, updatedToken, id]
    );

    return res.status(200).json({
      id,
      message: "Device muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const removeDevice = async (req, res) => {
  let { id } = req.params;
  try {
    const existingDevice = await pool.query(
      `
            SELECT * FROM device_token WHERE  id = $1
        `,
      [id]
    );

    if (existingDevice.rows.length == 0) {
      return res.status(404).json({ message: "Device topilmadi" });
    }

    await pool.query(
      `
            DELETE FROM device_token WHERE id = $1
        `,
      [id]
    );

    return res.status(200).json({
      id: id,
      message: "Device muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDevice,
  getAllDevices,
  getDeviceOneById,
  removeDevice,
  updateDevice,
};
