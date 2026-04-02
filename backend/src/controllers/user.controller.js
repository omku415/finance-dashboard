import {
  updateUserById,
  deleteUserById,
  getAllUsers,
} from "../services/user.service.js";

/**
 * GET /api/users
 */
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * PATCH /api/users/:id
 */
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateUserById(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE /api/users/:id
 */
export const deleteUser = async (req, res) => {
  try {
    await deleteUserById(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};