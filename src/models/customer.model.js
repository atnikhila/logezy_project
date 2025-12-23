const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

  const Customer = sequelize.define(
    "Customer",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), allowNull: false },
      mobile_number: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING },
      dob: { type: DataTypes.DATEONLY },
      gender: { type: DataTypes.ENUM("MALE", "FEMALE", "OTHER") }
    },
    { tableName: "customers", timestamps: true }
  );

  // return Customer;
  module.exports = Customer;


