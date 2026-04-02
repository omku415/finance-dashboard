import express from "express";
import cors from "cors";

const app = express();
import authRoutes from "./routes/auth.routes.js";
import recordRoutes from "./routes/record.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

app.use(cors({
  origin: "https://finance-dashboard-om.netlify.app",
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

export default app;