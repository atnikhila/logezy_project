// utils/validateUserRow.js
module.exports = (row) => {
  const errors = [];

  if (!row.name) errors.push("Name missing");
  if (!row.email || !row.email.includes("@")) errors.push("Invalid email");
  if (!["ACTIVE", "INACTIVE"].includes(row.status))
    errors.push("Invalid status");
  if (!row.mobile_number || row.mobile_number.length < 10)
    errors.push("Invalid mobile number");

  return errors;
};
