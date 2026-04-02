import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data.data);
      } catch (error) {
        console.log(error);
        alert("Failed to load dashboard");
      }
    };

    fetchDashboard();
  }, []);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-black p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded shadow">
            <h2 className="font-semibold">Total Income</h2>
            <p className="text-green-600 text-lg">₹ {data.totalIncome}</p>
          </div>

          <div className="p-4 border rounded shadow">
            <h2 className="font-semibold">Total Expense</h2>
            <p className="text-red-600 text-lg">₹ {data.totalExpense}</p>
          </div>

          <div className="p-4 border rounded shadow">
            <h2 className="font-semibold">Net Balance</h2>
            <p className="text-blue-600 text-lg">₹ {data.netBalance}</p>
          </div>
        </div>

        {/* Category Stats */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Category Summary</h2>
          {data.categoryStats.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span>{item._id}</span>
              <span>₹ {item.total}</span>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>

          {data.recent.map((item) => (
            <div key={item._id} className="border p-3 rounded mb-2">
              <div className="flex justify-between">
                <span>{item.category}</span>
                <span
                  className={
                    item.type === "income" ? "text-green-600" : "text-red-600"
                  }
                >
                  ₹ {item.amount}
                </span>
              </div>
              <small>{new Date(item.date).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
