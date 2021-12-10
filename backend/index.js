const express  = require('express');
const mongoose = require("mongoose");
const ExpensesModel = require("./models/Expenses");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://aditya:8901459471@cluster0.9zo35.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);


app.post('/insert',async (req,res) => {

    const title = req.body.title;
const amount = req.body.amount;
const date = req.body.date;

    const Expenses = new ExpensesModel({
  // title:"Apple",
  // amount:'9.99',
  // date:"3-10-2019"

  title: title,
  amount: amount,
  date: date,
});
try{
    await Expenses.save();
res.send("data inserted");
}catch(err)
{
    console.log(err);
}
})


app.get("/read", async (req, res) => {
ExpensesModel.find({}, (err,result) => {
  if(err){
    console.log(err);
    res.send(err);
  }
  res.send(result);
})
});


app.put("/update", async (req, res) => {
  const newTitle= req.body.newTitle;
  const id  = req.body.id;

  try {
await ExpensesModel.findById(id, (err, updateExpense) => {
  updateExpense.title = newTitle,
  updateExpense.save();
  res.send("update");
}).clone();
}catch (err) {
    console.log(err);
  }
});


app.delete("/delete/:id", async(req,res )=> {
const id = req.params.id;
await ExpensesModel.findByIdAndRemove(id).exec();
res.send("deleted");
});

app.listen(5000, () => {
    console.log("Server ruuning on PORT 5000");
})