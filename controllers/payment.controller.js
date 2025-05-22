const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addPayment = async (req, res) => {
  try {
    const {
        student_id,
        payment_last_date,
        payment_date,
        price,
        is_paid,
        total_attent,
    } = req.body;
    const newPayment = await pool.query(
      `
                    INSERT INTO "payment" (student_id,payment_last_date,payment_date,price,is_paid,total_attent) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
                `,
      [student_id,payment_last_date,payment_date,price,is_paid,total_attent]
    );

    res.status(201).send(newPayment.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await pool.query(`
    SELECT * FROM "payment"
        `);
    res.status(200).send(payments.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getPaymentOneById = async (req, res) => {
  let { id } = req.params;
  try {
    const payment = await pool.query(
      `
                SELECT * FROM "payment" WHERE id = $1
            `,
      [id]
    );

    res.status(200).send(payment.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updatePayment = async (req, res) => {
  let { id } = req.params;
  try {
    const existingPaymentResult = await pool.query(
      `SELECT * FROM "payment" WHERE id = $1`,
      [id]
    );

    if (existingPaymentResult.rows.length === 0) {
      return res.status(404).json({ message: "Payment topilmadi" });
    }

    const existingPayment = existingPaymentResult.rows[0];

    const updatedStudentId = req.body.student_id ?? existingPayment.student_id;
    const updatedPaymentLastDate = req.body.payment_last_date ?? existingPayment.payment_last_date;
    const updatedPaymentDate = req.body.payment_date ?? existingPayment.payment_date;
    const updatedPrice = req.body.price ?? existingPayment.price;
    const updatedIsPaid = req.body.is_paid ?? existingPayment.is_paid;
    const updatedTotalAttent = req.body.total_attent ?? existingPayment.total_attent;

    await pool.query(
      `
          UPDATE "payment"
          SET student_id = $1, payment_last_date = $2, payment_date = $3, price = $4, is_paid = $5, total_attent = $6
          WHERE id = $7
        `,
      [updatedStudentId, updatedPaymentLastDate, updatedPaymentDate, updatedPrice, updatedIsPaid, updatedTotalAttent, id]
    );

    return res.status(200).json({
      id,
      message: "Payment muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const removePayment = async (req, res) => {
  let { id } = req.params;
  try {
    const existingPayment = await pool.query(
      `
            SELECT * FROM "payment" WHERE  id = $1
        `,
      [id]
    );

    if (existingPayment.rows.length == 0) {
      return res.status(404).json({ message: "Payment topilmadi" });
    }

    await pool.query(
      `
            DELETE FROM "payment" WHERE id = $1
        `,
      [id]
    );

    return res.status(200).json({
      id: id,
      message: "Payment muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addPayment,
  getAllPayments,
  getPaymentOneById,
  removePayment,
  updatePayment,
};
