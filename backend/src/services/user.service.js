import User from "../models/user.model.js";

/**
 * Update user role or status
 */
export const updateUserById = async (userId, updateData) => {
  const allowedFields = ["role", "status"];

  // Filter only allowed updates
  const updates = {};
  Object.keys(updateData).forEach((key) => {
    if (allowedFields.includes(key)) {
      updates[key] = updateData[key];
    }
  });

  if (Object.keys(updates).length === 0) {
    throw new Error("No valid fields provided for update");
  }

  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Delete user
 */
export const deleteUserById = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return true;
};

/**
 * Get all users (for admin panel)
 */
export const getAllUsers = async () => {
  return await User.find().select("-password");
};