import express from "express";
import cors from "cors";

const app = express();
import authRoutes from "./routes/auth.routes.js";
import recordRoutes from "./routes/record.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import userRoutes from "./routes/user.routes.js"

app.use(cors({
  origin: [
     "http://localhost:5173",
    "https://finance-dashboard-om.netlify.app"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes); 
app.get("/", (req, res) => {
  res.send("API Running...");
});

export default app;