import { getDashboardData } from "../services/dashboard.service.js";
import Record from "../models/record.model.js";
import mongoose from "mongoose"; 

export const getDashboard = async (req, res) => {
  try {
    const data = await getDashboardData();

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

export const getAnalytics = async (req, res) => {
  try {
    const data = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
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