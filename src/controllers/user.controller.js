const User = require("../models/user.model");
const Enums = require("../constants/enums");

// Get all users (Admin)
exports.getUsers = async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    // const users = await User.findAll({
    //   attributes: { exclude: ["password"] }
    // });
    const { count, rows } = await User.findAndCountAll({
      attributes: { exclude: ["password"] }, // 🔒 hide password
      limit,
      offset,
      order: [["createdAt", "DESC"]]
    });
    // res.json(users);
    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        totalRecords: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        limit
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

// Get user by ID
exports.getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password"] }
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

// Update user (Admin)
exports.updateUser = async (req, res) => {
  const { name, role, status } = req.body;
  if (role !== Enums.USER_ROLES.ADMIN && role !== Enums.USER_ROLES.USER) {
    return res.status(404).json({ message: `User roles must be ${Enums.USER_ROLES.ADMIN} or ${Enums.USER_ROLES.USER}` });
  }
  if (status !== Enums.USER_STATUS.ACTIVE && status !== Enums.USER_STATUS.INACTIVE) {
    return res.status(404).json({ message: `User status must be ${Enums.USER_STATUS.ACTIVE} or ${Enums.USER_STATUS.INACTIVE}` });
  }
  await User.update(
    { role, status },
    { where: { id: req.params.id } }
  );

  res.json({ message: "User updated successfully" });
};
// Hard delete
// Delete user (Admin)
// exports.deleteUser = async (req, res) => {
//   await User.destroy({ where: { id: req.params.id } });
//   res.json({ message: "User deleted successfully" });
// };
// soft delete
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.update(
      { status: Enums.USER_STATUS.INACTIVE },
      { where: { id: req.params.id } }
    );

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Logged-in User Profile
exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found error"
      });
    }

    res.json({
      message: "User profile fetched successfully",
      data: user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

