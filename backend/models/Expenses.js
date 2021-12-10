const mongoose = require("mongoose");

const ExpensesSchema = new mongoose.Schema([
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      format:"date",
      required: true,
    },
  }
]);

const Expenses = mongoose.model("ExpensesData", ExpensesSchema);
module.exports = Expenses;