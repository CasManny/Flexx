import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";

import userRoutes from "../routes/user.route.js";
import adminRoutes from "../routes/admin.route.js";
import authRoutes from "../routes/auth.route.js";
import songRoutes from "../routes/songs.route.js";
import albumRoutes from "../routes/albums.route.js";
import statRoutes from "../routes/stats.route.js";
import connectDb from "../db/connectDb.js";
import { handleError } from "../middlewares/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(clerkMiddleware()); // this will attach an req.auth to our request object
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10mb max file size
  })
);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.use(handleError)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectDb();
});
