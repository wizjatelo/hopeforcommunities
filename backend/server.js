import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mpesaRoutes from "./routes/mpesaRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/mpesa", mpesaRoutes);
app.use("/payment", paymentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
