import express, { Request, Response, NextFunction } from "express";
import healthRouter from "./routes/health.routes.js";
import productRouter from "./routes/product.routes.js";
import authRouter from "./routes/auth.routes.js";
import categoryRouter from "./routes/category.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import reviewRouter from "./routes/review.routes.js";

const app = express();

app.use(express.json());
app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/bookings", bookingRouter);
app.use("/reviews", reviewRouter);
app.use("/health", healthRouter);

app.post("/test", (req, res) => {
  console.log(req.body);

  res.json({
    success: true,
    data: req.body,
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


export default app;