const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addGroup = async (req, res) => {
  try {
    const {
      name,
      lesson_start_time,
      lesson_end_time,
      lesson_week_day,
      stage_id,
      branch_id,
      room_floor,
      room,
      lessons_quantitiy
    } = req.body;
    const newGroup = await pool.query(
      `
                    INSERT INTO "group" (name,lesson_start_time,lesson_end_time,lesson_week_day,stage_id,branch_id,room_floor,room,lessons_quantitiy) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *
                `,
      [name,lesson_start_time,lesson_end_time,lesson_week_day,stage_id,branch_id,room_floor,room,lessons_quantitiy]
    );

    res.status(201).send(newGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllGroups = async (req, res) => {
  try {
    const groups = await pool.query(`
    SELECT * FROM "group"
        `);
    res.status(200).send(groups.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getGroupOneById = async (req, res) => {
  let { id } = req.params;
  try {
    const group = await pool.query(
      `
                SELECT * FROM "group" WHERE id = $1
            `,
      [id]
    );

    res.status(200).send(group.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateGroup = async (req, res) => {
  let { id } = req.params;
  try {
    const existingGroupResult = await pool.query(
      `SELECT * FROM "group" WHERE id = $1`,
      [id]
    );

    if (existingGroupResult.rows.length === 0) {
      return res.status(404).json({ message: "Group topilmadi" });
    }

    const existingGroup = existingGroupResult.rows[0];

    const updatedName = req.body.name ?? existingGroup.name;
    const updatedLessonStartTime = req.body.lesson_start_time ?? existingGroup.lesson_start_time;
    const updatedLessonEndTime = req.body.lesson_end_time ?? existingGroup.lesson_end_time;
    const updatedLessonWeekDay = req.body.lesson_week_day ?? existingGroup.lesson_week_day;
    const updatedStageId = req.body.stage_id ?? existingGroup.stage_id;
    const updatedBranchId = req.body.branch_id ?? existingGroup.branch_id;
    const updatedRoomFloor = req.body.room_floor ?? existingGroup.room_floor;
    const updatedRoom = req.body.room ?? existingGroup.room;
    const updatedLessonsQuantitiy = req.body.lessons_quantitiy ?? existingGroup.lessons_quantitiy;

    await pool.query(
      `
          UPDATE "group"
          SET name = $1, lesson_start_time = $2, lesson_end_time = $3, lesson_week_day = $4, stage_id = $5, branch_id = $6, room_floor = $7, room = $8, lessons_quantitiy = $9
          WHERE id = $10
        `,
      [updatedName, updatedLessonStartTime, updatedLessonEndTime, updatedLessonWeekDay, updatedStageId, updatedBranchId, updatedRoomFloor, updatedRoom, updatedLessonsQuantitiy, id]
    );

    return res.status(200).json({
      id,
      message: "Group muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const removeGroup = async (req, res) => {
  let { id } = req.params;
  try {
    const existingGroup = await pool.query(
      `
            SELECT * FROM "group" WHERE  id = $1
        `,
      [id]
    );

    if (existingGroup.rows.length == 0) {
      return res.status(404).json({ message: "Group topilmadi" });
    }

    await pool.query(
      `
            DELETE FROM "group" WHERE id = $1
        `,
      [id]
    );

    return res.status(200).json({
      id: id,
      message: "Group muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addGroup,
  getAllGroups,
  getGroupOneById,
  removeGroup,
  updateGroup,
};
