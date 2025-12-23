const User = require("../models/user.model");

const createAdminUser = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  const adminExists = await User.findOne({
    where: { email: ADMIN_EMAIL }
  });

  if (!adminExists) {
    await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
      status: "active"
    });

    console.log("Admin user created");
  }
};


module.exports = createAdminUser;
