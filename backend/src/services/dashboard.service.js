import Record from "../models/record.model.js";

export const getDashboardData = async (userId) => {
  // 🔥 Aggregate all data
  const stats = await Record.aggregate([
    {
      $match: { user: userId },
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  stats.forEach((item) => {
    if (item._id === "income") totalIncome = item.total;
    if (item._id === "expense") totalExpense = item.total;
  });

  const netBalance = totalIncome - totalExpense;

  // 🔥 Category-wise totals
  const categoryStats = await Record.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);

  // 🔥 Recent transactions
  const recent = await Record.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    totalIncome,
    totalExpense,
    netBalance,
    categoryStats,
    recent,
  };
};