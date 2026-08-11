import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes.js";
import productRouter from "./routes/product.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import reviewRouter from "./routes/review.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/health", healthRouter);

// Legacy/Direct Root Routes for backward compatibility
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/reviews", reviewRouter);
app.use("/bookings", bookingRouter);
app.use("/health", healthRouter);

// Root Health Check Route
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "AgriBridge Backend API is running",
  });
});

app.post("/api/test", (req, res) => {
  res.json({
    success: true,
    data: req.body,
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
