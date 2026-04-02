import { getDashboardData } from "../services/dashboard.service.js";

export const getDashboard = async (req, res) => {
  try {
    const data = await getDashboardData(req.user._id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};