import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookiePasser from "cookie-parser";
import { logger } from "./config/index";
import orderRouter from "./routes/order.route";
import notFound from "./middlewares/notFound";
import { ErrorHandler } from "./errors/errorHandler";
import foodRouter from "./routes/food.route";
import categoryRouter from "./routes/category.route";
import reservationRouter from "./routes/reservation.route";
import webhookRouter from "./routes/webhook.routes";
import "./models/index";

const app: Application = express();

app.use("/webhook", webhookRouter);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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
app.use("/category", categoryRouter);
app.use("/reservation", reservationRouter);

//error handlers
app.use(notFound);
app.use(ErrorHandler);

export default app;
