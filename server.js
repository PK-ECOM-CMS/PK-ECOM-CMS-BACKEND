import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import express from "express";
const app = express();
// serve static contents
import path from "path";
const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "/frontend/build")));
// app.use(express.static(path.join(__dirname, "/api/public")));

const PORT = process.env.PORT || 8000;
// db connection
import { dbConnection } from "./src/config/dbConfig.js";
dbConnection();
// middlewaress
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// apis
import adminUserRouter from "./src/routers/adminUserRouter.js";
import categoriesRouter from "./src/routers/categoriesRouter.js";
import productsRouter from "./src/routers/productsRouter.js";
import itemRouter from "./src/routers/itemRouter.js";
import { adminAuth } from "./src/middlewares/auth-middleware/authMiddleware.js";
import paymentMethodsRouter from "./src/routers/paymentMethodsRouter.js";
import orderRouter from "./src/routers/orderRouter.js";
import reviewRouter from "./src/routers/reviewsRouter.js";
import ueserRouter from "./src/routers/usersRouter.js";
app.use("/api/v1/admin-user", adminUserRouter);
app.use("/api/v1/categories", adminAuth, categoriesRouter);
app.use("/api/v1/product", productsRouter);
app.use("/api/v1/payment-methods", adminAuth, paymentMethodsRouter);
app.use("/api/v1/items", adminAuth, itemRouter);
app.use("/api/v1/orders", adminAuth, orderRouter);
app.use("/api/v1/reviews", adminAuth, reviewRouter);
app.use("/api/v1/users", adminAuth, ueserRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.status || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server running on http://localhost:${PORT}`);
});
