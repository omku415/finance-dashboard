import Record from "../models/record.model.js";

// CREATE
export const createRecord = async (data, userId) => {
  return await Record.create({
    ...data,
    user: userId,
  });
};

// GET ALL (with filters)
export const getRecords = async (query, userId) => {
  const filter = { user: userId };

  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;

  // 🔥 search
  if (query.search) {
    filter.$or = [
      { category: { $regex: query.search, $options: "i" } },
      { note: { $regex: query.search, $options: "i" } },
    ];
  }

  if (query.startDate && query.endDate) {
    filter.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate),
    };
  }

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 5;
  const skip = (page - 1) * limit;

  const total = await Record.countDocuments(filter);

  const records = await Record.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    data: records,
  };
};
// UPDATE
export const updateRecord = async (id, data, userId) => {
  const record = await Record.findOne({ _id: id, user: userId });

  if (!record) {
    throw new Error("Record not found");
  }

  Object.assign(record, data);
  return await record.save();
};

// DELETE
export const deleteRecord = async (id, userId) => {
  const record = await Record.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!record) {
    throw new Error("Record not found");
  }

  return record;
};
