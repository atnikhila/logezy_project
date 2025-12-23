// controllers/user.import.controller.js
const csv = require("csv-parser");
const { Readable } = require("stream");
const validateRow = require("../utils/validateUserRows");
const Customer = require("../models/customer.model");
const moment = require("moment");


exports.importUsers = async (req, res) => {
  const validUsers = [];
  const failedRows = [];
  let rowNumber = 1;

  Readable.from(req.file.buffer)
    .pipe(csv({
      mapHeaders: ({ header }) => header.toLowerCase().trim()
    }))
    .on("data", (row) => {
      const normalize = (v) => v?.toString().trim();
          const dobMoment = moment(row.dob, ["D/M/YYYY"], true); // converting date format

      const customer = {
        name: normalize(row.name),
        email: normalize(row.email),
        status: normalize(row.status)?.toUpperCase(),
        mobile_number: row.mobile_number
          ? String(row.mobile_number).replace(/\D/g, "")
          : null,
        address: normalize(row.address),
        dob: dobMoment.isValid()  ? dobMoment.format("YYYY-MM-DD"): null,
        gender: normalize(row.gender)?.toUpperCase()
      };

      const errors = validateRow(customer);

      if (errors.length) {
        failedRows.push({ row: rowNumber, errors, data: row });
      } else {
        validUsers.push(customer);
      }
      rowNumber++;
    })
    .on("end", async () => {
      await Customer.bulkCreate(validUsers, {
        updateOnDuplicate: [
          "name",
          "status",
          "mobile_number",
          "address",
          "dob",
          "gender"
        ]
      });

      res.json({ message: "Data imported successfully",
        total: rowNumber - 1,
        inserted: validUsers.length,
        failed: failedRows.length,
        failedRows
      });
    });
};
