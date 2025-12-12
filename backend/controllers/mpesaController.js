import { initiateSTKPush } from "../mpesa/stkPush.js";

export const donateViaMpesa = async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount)
      return res.status(400).json({ message: "Phone & amount required" });

    const response = await initiateSTKPush(phone, amount);
    res.json(response);

  } catch (error) {
    console.error("M-Pesa Error:", error.response?.data || error);
    res.status(500).json({ message: "M-Pesa request failed", error });
  }
};

// Mpesa Callback
export const mpesaCallback = async (req, res) => {
  console.log("===== M-PESA CALLBACK RECEIVED =====");
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).json({ message: "Callback received" });
};
