import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import menuRoutes from "./modules/menu/menu.routes";
import orderRoutes from "./modules/order/order.routes";
import reviewRoutes from "./modules/review/review.routes";
import paymentRoutes from "./modules/payment/payment.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://cafe-admin-lilac.vercel.app"
  ],
  credentials: true
}));

app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Cafe API is running 🚀");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});