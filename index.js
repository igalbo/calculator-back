const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () =>
  console.log(`Calculator server is running on port ${PORT}`)
);

const history = [];

app.get("/calc/", (req, res) => {
  let firstNum = req.body.num1;
  let secondNum = req.body.num2;
  let operator = req.body.oper;
  let result;

  switch (operator) {
    case "+":
      result = Number(firstNum) + Number(secondNum);
      console.log(result);
      break;
    case "-":
      result = Number(firstNum) - Number(secondNum);
      break;
    case "*":
      result = Number(firstNum) * Number(secondNum);
      break;
    case "/":
      result = Number(firstNum) / Number(secondNum);
      break;
  }

  history.push({
    num1: firstNum,
    num2: secondNum,
    operator: operator,
    result: result,
  });

  res.json(result);
});

app.get("/history", (req, res) => {
  res.json(history);
});
