import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/dashboard/analytics");
        setAnalytics(res.data.data);
      } catch (error) {
        console.log(error);
        alert("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>

        {analytics.map((item, index) => (
          <div key={index} className="flex justify-between border-b py-2">
            <span>{item._id}</span>
            <span>₹ {item.total}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Analytics;