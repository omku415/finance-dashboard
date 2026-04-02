import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "",
    note: "",
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchRecords = async () => {
    try {
      const res = await API.get(
        `/records?search=${search}&page=${page}&limit=5`,
      );
      setRecords(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [search, page]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/records", form);

    setForm({ amount: "", type: "income", category: "", note: "" });
    fetchRecords();

  } catch (error) {
    const message = error.response?.data?.message;

    if (message === "Access denied") {
      alert("You are not authorized to perform this action");
    } else {
      alert(message || "Failed to add record");
    }
  }
};

  const handleDelete = async (id) => {
    try {
      await API.delete(`/records/${id}`);
      fetchRecords();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-black p-6">
        <h1 className="text-2xl font-bold mb-4">Records</h1>

        {/* Add Record */}
        <form onSubmit={handleSubmit} className="mb-6 space-y-3">
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            name="note"
            placeholder="Note"
            value={form.note}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button className="bg-black text-white px-4 py-2 rounded">
            Add Record
          </button>
        </form>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Records List */}
        {records.map((item) => (
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
            <small>{item.note}</small>

            <button
              onClick={() => handleDelete(item._id)}
              className="text-red-600 text-sm mt-2"
            >
              Delete
            </button>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border"
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1 border"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Records;
