"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
// routes
const menu_routes_1 = __importDefault(require("./modules/menu/menu.routes"));
const order_routes_1 = __importDefault(require("./modules/order/order.routes"));
const review_routes_1 = __importDefault(require("./modules/review/review.routes"));
app.use("/api/menu", menu_routes_1.default);
app.use("/api/orders", order_routes_1.default);
app.use("/api/reviews", review_routes_1.default);
// test route
app.get("/", (req, res) => {
    res.send("Cafe API is running 🚀");
});
const PORT = process.env.PORT || 4000;
const payment_routes_1 = __importDefault(require("./modules/payment/payment.routes"));
app.use("/api/payment", payment_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
