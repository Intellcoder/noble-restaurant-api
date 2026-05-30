"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = require("./config/index");
const order_route_1 = __importDefault(require("./routes/order.route"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const errorHandler_1 = require("./errors/errorHandler");
const food_route_1 = __importDefault(require("./routes/food.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb" }));
app.use((0, helmet_1.default)());
app.use(index_1.logger);
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Noble Restaurant API is running 🚀",
    });
});
//initialize routes
app.use("/order", order_route_1.default);
app.use("/food", food_route_1.default);
app.use("/category", category_route_1.default);
//error handlers
app.use(notFound_1.default);
app.use(errorHandler_1.ErrorHandler);
exports.default = app;
//# sourceMappingURL=index.js.map