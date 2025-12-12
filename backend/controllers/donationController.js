// controllers/donationsController.js
import { createDonationRecord, updateDonationStatus } from "../models/Donation.js";
import { initiateStkPush } from "../mpesa/stkPush.js"; // we'll add this file in Step 2

export const createDonation = async (req, res) => {
  try {
    const { name, email, phone, amount, cause, anonymous, paymentMethod } = req.body;

    if (!name || !email || !amount) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Save donation as pending
    const donationId = await createDonationRecord({
      name, email, phone, amount: parseInt(amount, 10), cause, payment_method: paymentMethod, anonymous
    });

    // If payment method is mpesa, initiate STK push and return the CheckoutRequestID to client
    if (paymentMethod === "mpesa") {
      try {
        const stkResponse = await initiateStkPush(phone, amount, donationId);
        return res.json({ success: true, donationId, stkResponse });
      } catch (err) {
        console.error("STK push error:", err?.response?.data || err.message || err);
        return res.status(500).json({ success: false, message: "Failed to start M-Pesa payment", error: err?.message || err });
      }
    }

    // For other methods, simply return success (you'll add more later)
    return res.json({ success: true, donationId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const mpesaCallback = async (req, res) => {
  try {
    const body = req.body;
    // STK callback is in body.Body.stkCallback
    const stkCallback = body?.Body?.stkCallback;
    if (!stkCallback) {
      return res.status(400).json({ success: false, message: "Invalid callback" });
    }

    const merchantRequestId = stkCallback.MerchantRequestID;
    const resultCode = stkCallback.ResultCode;
    const resultDesc = stkCallback.ResultDesc;

    // find mpesa receipt if present
    let receipt = null;
    const items = stkCallback.CallbackMetadata?.Item || [];
    for (const it of items) {
      if (it.Name === "MpesaReceiptNumber") {
        receipt = it.Value;
        break;
      }
    }

    // merchantRequestId was not tied to donationId in earlier simplified flow.
    // We'll store mapping in meta when initiating STK push. For now try to parse donationId from custom field (if you set one)
    // Example earlier code may set AccountReference or fetch mapping from some storage.
    // For now, assume AccountReference or meta contains donationId; fallback: log and respond.
    // TODO: map MerchantRequestID -> donationId (persist mapping when we call STK push)

    console.log("STK callback:", { merchantRequestId, resultCode, resultDesc, receipt });

    // You must map merchantRequestId to donationId. For now respond success.
    res.json({ success: true });
  } catch (err) {
    console.error("Callback error:", err);
    res.status(500).json({ success: false });
  }
};
