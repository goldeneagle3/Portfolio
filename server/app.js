import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import bookRoutes from "./routes/book.routes.js";
import softwareRoutes from "./routes/software.routes.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:true,
}));

// app.use(express.static(path.join(CURRENT_WORKING_DIR, "client/build")));

// mount routes
app.use("/api/", userRoutes);
app.use("/api/", postRoutes);
app.use("/api/", bookRoutes);
app.use("/api/", softwareRoutes);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});


export default app;
