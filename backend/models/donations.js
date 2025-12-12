// models/Donation.js
import db from "../config/db.js";

export const createDonationRecord = async ({
  name, email, phone, amount, cause, payment_method, anonymous, meta = {}
}) => {
  const [result] = await db.query(
    `INSERT INTO donations (name, email, phone, amount, cause, payment_method, anonymous, status, meta)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
    [name, email, phone, amount, cause, payment_method, anonymous ? 1 : 0, JSON.stringify(meta || {})]
  );
  return result.insertId;
};

export const updateDonationStatus = async (id, status, extra = {}) => {
  await db.query(
    `UPDATE donations SET status = ?, mpesa_receipt = ?, meta = JSON_MERGE_PATCH(meta, ?) WHERE id = ?`,
    [status, extra.mpesa_receipt || null, JSON.stringify(extra || {}), id]
  );
};

export const getDonationById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM donations WHERE id = ?`, [id]);
  return rows[0];
};
