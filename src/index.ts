import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookiePasser from "cookie-parser";
import { logger } from "./config/index";
import orderRouter from "./routes/order.route";
import notFound from "./middlewares/notFound";
import { ErrorHandler } from "./errors/errorHandler";
import comboRouter from "./routes/combo.routes";
import foodRouter from "./routes/food.route";
import categoryRouter from "./routes/category.route";
import reservationRouter from "./routes/reservation.route";
import webhookRouter from "./routes/webhook.routes";
import "./models/index";

const app: Application = express();

app.use("/webhook", webhookRouter);

const allowedOrigins = [
  "http://localhost:5173",
  "https://noble-restaurant.ng",
  "https://www.noble-restaurant.ng",
  "https://noble-restaurant.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman/mobile apps/no-origin requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));
app.use(helmet());
app.use(logger);
app.use(cookiePasser());
app.use(compression());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Noble Restaurant API is running 🚀",
  });
});

//initialize routes
app.use("/order", orderRouter);
app.use("/food", foodRouter);
app.use("/combo", comboRouter);
app.use("/category", categoryRouter);
app.use("/reservation", reservationRouter);

//error handlers
app.use(notFound);
app.use(ErrorHandler);

export default app;
