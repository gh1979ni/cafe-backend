"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const menu_routes_1 = __importDefault(require("./modules/menu/menu.routes"));
const order_routes_1 = __importDefault(require("./modules/order/order.routes"));
const review_routes_1 = __importDefault(require("./modules/review/review.routes"));
const payment_routes_1 = __importDefault(require("./modules/payment/payment.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://cafe-admin-lilac.vercel.app"
    ],
    credentials: true
}));
app.options("*", (0, cors_1.default)());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/menu", menu_routes_1.default);
app.use("/api/orders", order_routes_1.default);
app.use("/api/reviews", review_routes_1.default);
app.use("/api/payment", payment_routes_1.default);
app.get("/", (req, res) => {
    res.send("Cafe API is running 🚀");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
