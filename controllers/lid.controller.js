const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addLid = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      target_id,
      stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      status_id,
      reason_id,
    } = req.body;
    const newLid = await pool.query(
      `
    INSERT INTO lid (
      first_name,
      last_name,
      phone_number,
      target_id,
      stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      status_id,
      reason_id
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *
  `,
      [
        first_name,
        last_name,
        phone_number,
        target_id,
        stage_id,
        test_date,
        trial_lesson_date,
        trial_lesson_time,
        trial_lesson_group_id,
        status_id,
        reason_id,
      ]
    );

    res.status(201).send(newLid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllLid = async (req, res) => {
  try {
    const lids = await pool.query(`
    SELECT * FROM lid
        `);
    res.status(200).send(lids.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getLidOneById = async (req, res) => {
  let { id } = req.params;
  try {
    const lid = await pool.query(
      `
                SELECT * FROM lid WHERE id = $1
            `,
      [id]
    );

    res.status(200).send(lid.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateLid = async (req, res) => {
  let { id } = req.params;
  try {
    const existingLidResult = await pool.query(
      `SELECT * FROM lid WHERE id = $1`,
      [id]
    );

    if (existingLidResult.rows.length === 0) {
      return res.status(404).json({ message: "Lid topilmadi" });
    }

    const existingLid = existingLidResult.rows[0];

    const updatedFirstName = req.body.first_name ?? existingLid.first_name;
    const updatedLastName = req.body.last_name ?? existingLid.last_name;
    const updatedPhoneNumber =
      req.body.phone_number ?? existingLid.phone_number;
    const updatedTargetId = req.body.target_id ?? existingLid.target_id;
    const updatedStageId = req.body.stage_id ?? existingLid.stage_id;
    const updatedTestDate = req.body.test_date ?? existingLid.test_date;
    const updatedTrialLessonDate =
      req.body.trial_lesson_date ?? existingLid.trial_lesson_date;
    const updatedTrialLessonTime =
      req.body.trial_lesson_time ?? existingLid.trial_lesson_time;
    const updatedTrialLessonGroupId =
      req.body.trial_lesson_group_id ?? existingLid.trial_lesson_group_id;
    const updatedStatusId = req.body.status_id ?? existingLid.status_id;
    const updatedReasonId = req.body.reason_id ?? existingLid.reason_id;

    await pool.query(
      `
          UPDATE lid
          SET first_name = $1, last_name = $2, phone_number = $3, target_id = $4, stage_id = $5, test_date = $6, trial_lesson_date = $7, trial_lesson_time = $8, trial_lesson_group_id = $9, status_id = $10, reason_id = $11
          WHERE id = $12
        `,
      [
        updatedFirstName,
        updatedLastName,
        updatedPhoneNumber,
        updatedTargetId,
        updatedStageId,
        updatedTestDate,
        updatedTrialLessonDate,
        updatedTrialLessonTime,
        updatedTrialLessonGroupId,
        updatedStatusId,
        updatedReasonId,
        id,
      ]
    );

    return res.status(200).json({
      id,
      message: "Lid muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const removeLid = async (req, res) => {
  let { id } = req.params;
  try {
    const existingLid = await pool.query(
      `
            SELECT * FROM lid WHERE  id = $1
        `,
      [id]
    );

    if (existingLid.rows.length == 0) {
      return res.status(404).json({ message: "Lid topilmadi" });
    }

    await pool.query(
      `
            DELETE FROM lid WHERE id = $1
        `,
      [id]
    );

    return res.status(200).json({
      id: id,
      message: "Lid muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addLid,
  getAllLid,
  getLidOneById,
  removeLid,
  updateLid,
};
