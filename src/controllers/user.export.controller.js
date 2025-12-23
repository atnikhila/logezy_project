// controllers/user.export.controller.js
const fastCsv = require("fast-csv");
const Customer = require("../models/customer.model");
const moment = require("moment");

exports.exportUsers = async (req, res) => {
  try {
    
  
   // Set response headers for file download
  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=customers.csv"
  );
res.setHeader("X-Export-Message", "Users exported successfully");

   // Stream CSV directly to response
  const csvStream = fastCsv.format({ headers: true });
  csvStream.pipe(res);

  // Fetch users in chunks to avoid memory issues
  const limit = 1000; // batch size
    let offset = 0;
    let users;

 do {
      users = await Customer.findAll({
        attributes: [
          "name",
          "email",
          "status",
          "mobile_number",
          "address",
          "dob",
          "gender"
        ],
        offset,
        limit,
        raw: true
      });

      users.forEach((customer) => {
        csvStream.write({
          name: customer.name,
          email: customer.email,
          status: customer.status,
          mobile_number: customer.mobile_number,
          address: customer.address,
          dob: customer.dob ? moment(customer.dob).format("YYYY-MM-DD") : "",
          gender: customer.gender
        });
      });
      offset += limit;
    } while (users.length === limit);


  csvStream.end();
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Failed to export users" });
  }
};
