const app = require("./app");
const sequelize = require("./config/database");
const createAdminUser = require("./admin/admin-user");
require("./models/customer.model");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync(); // creates missing tables
    console.log("Database connected");
    // Auto-create admin
    await createAdminUser();

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("Server startup failed:", err);
  }
})();
