import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../services/record.service.js";

// CREATE
export const create = async (req, res) => {
  try {
    const record = await createRecord(req.body, req.user._id);

    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET
export const getAll = async (req, res) => {
  try {
    const result = await getRecords(req.query, req.user._id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const update = async (req, res) => {
  try {
    const record = await updateRecord(
      req.params.id,
      req.body,
      req.user._id
    );

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
export const remove = async (req, res) => {
  try {
    const record = await deleteRecord(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: "Record deleted",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};