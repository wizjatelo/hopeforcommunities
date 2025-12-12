import axios from "axios";
import dotenv from "dotenv";
import { getAccessToken } from "../auth.js"; // Corrected path from previous steps

dotenv.config();

export const initiateSTKPush = async (phone, amount) => {
    // 1. Generate Token, Timestamp, and Password
    try {
        const token = await getAccessToken();
    } catch (tokenError) {
        console.error("Failed to get M-Pesa Access Token:", tokenError.message);
        return {
            status: 'error',
            message: 'Failed to authenticate with M-Pesa.',
            details: tokenError.message
        };
    }

    const timestamp = new Date()
        .toISOString()
        .replace(/[-:TZ.]/g, "")
        .substring(0, 14);

    const password = Buffer.from(
        `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const payload = {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount, // Ensure this is a valid integer amount
        PartyA: phone, // Ensure this is a valid phone number (e.g., 2547XXXXXXXX)
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "HopeForCommunities",
        TransactionDesc: "Donation Payment"
    };

    // 2. Wrap the M-Pesa API call in try...catch to handle external errors
    try {
        const response = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;

    } catch (error) {
        console.error("--- M-Pesa STK Push Error Details ---");
        
        // Handle Axios errors (M-Pesa API errors will usually be here)
        if (axios.isAxiosError(error) && error.response) {
            console.error("Status Code:", error.response.status);
            console.error("Error Data:", error.response.data);
            
            // Return the specific M-Pesa error details
            return {
                status: 'error',
                message: 'STK Push failed at M-Pesa API level',
                details: error.response.data,
                statusCode: error.response.status
            };
        }
        
        // Handle other generic errors (network, etc.)
        console.error("Generic Error:", error.message);
        return {
            status: 'error',
            message: 'STK Push failed due to internal server error or network issue',
            details: error.message
        };
    }
};