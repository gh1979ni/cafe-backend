import authRoutes from "./modules/auth/auth.routes";
import express from "express";

import dotenv from "dotenv";
import userRoutes from "./modules/user/user.routes";
dotenv.config();
const app = express(); 
import cors from "cors";
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://cafe-admin-lilac.vercel.app"
  ],
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// routes
import menuRoutes from "./modules/menu/menu.routes";
import orderRoutes from "./modules/order/order.routes";
import reviewRoutes from "./modules/review/review.routes";

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Cafe API is running 🚀");
});

const PORT = process.env.PORT || 4000;
import paymentRoutes from "./modules/payment/payment.routes";

app.use("/api/payment", paymentRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
