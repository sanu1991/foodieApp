const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/mealfilter", async (req, res) => {
  // if (req.body.costForTwo) {
  // if (req.body.location || req.body.costForTwo) {
  // let cuisinesSrch = req.body.cuisines.map((i) => ({ cuisines: { $elemMatch: { label: i.label } } }))
  // let cuisinesSrch = req.body.cuisines.map((i) => ({ $elemMatch: { label: i.label } }))
  //   console.log(req.body);
  let meal = [];
  let bodyObj = {};
  let condition1 =
    req.body.costForTwo === 1
      ? 0
      : req.body.costForTwo === 2
      ? 500
      : req.body.costForTwo === 3
      ? 1000
      : req.body.costForTwo === 4
      ? 1500
      : req.body.costForTwo === 5
      ? 2000
      : "";
  let condition2 =
    req.body.costForTwo === 1
      ? 500
      : req.body.costForTwo === 2
      ? 1000
      : req.body.costForTwo === 3
      ? 1500
      : req.body.costForTwo === 4
      ? 2000
      : "";

  if (req.body.location && req.body.costForTwo && req.body.cuisines) {
    bodyObj = {
      location: req.body.location,
      costForTwo:
        req.body.costForTwo !== 5
          ? { $gt: condition1, $lt: condition2 }
          : { $gte: condition1 },
      cuisines: { $elemMatch: { label: req.body?.cuisines?.label } },
    };
    meal = await Product.find(bodyObj);
  } else if (req.body.location && req.body.costForTwo) {
    bodyObj = {
      location: req.body.location,
      costForTwo:
        req.body.costForTwo !== 5
          ? { $gt: condition1, $lt: condition2 }
          : { $gte: condition1 },
    };
    meal = await Product.find(bodyObj);
  } else if (req.body.location && req.body.cuisines) {
    bodyObj = {
      location: req.body.location,
      cuisines: { $elemMatch: { label: req.body?.cuisines?.label } },
    };
    meal = await Product.find(bodyObj);
  } else if (req.body.costForTwo && req.body.cuisines) {
    bodyObj = {
      costForTwo:
        req.body.costForTwo !== 5
          ? { $gt: condition1, $lt: condition2 }
          : { $gte: condition1 },
      cuisines: { $elemMatch: { label: req.body?.cuisines?.label } },
    };
    meal = await Product.find(bodyObj);
  } else if (req.body.location) {
    bodyObj = { location: req.body.location };
    meal = await Product.find(bodyObj);
  } else if (req.body.costForTwo) {
    bodyObj = {
      costForTwo:
        req.body.costForTwo !== 5
          ? { $gt: condition1, $lt: condition2 }
          : { $gte: condition1 },
    };
    meal = await Product.find(bodyObj);
  } else if (req.body.cuisines) {
    bodyObj = {
      cuisines: { $elemMatch: { label: req.body?.cuisines?.label } },
    };
    meal = await Product.find(bodyObj);
  } else {
    meal = await Product.find({});
  }
  {
    meal ? res.send(meal) : res.send({ result: "No meal Found" });
  }

  // else if (req.body.cuisines) {
  // bodyObj = { cuisines: { $elemMatch: { label: req.body?.cuisines } } };
  // bodyObj = { cuisines: { $elemMatch: { label: req.body?.cuisines[0]?.label } } };
  // bodyObj = { cuisines: { $elemMatch:  req.body?.cuisines.map((i, indx) => { return {label: i.label} })  } };
  // bodyObj = { cuisines: cuisinesSrch };
  // bodyObj = cuisinesSrch ;

  // res.send(bodyObj);

  // let meal = req.body?.cuisines.map((ele) => {
  //     bodyObj = { cuisines: { $elemMatch: { label: ele.label } } };

  //     return Product.find(bodyObj)
  // })
  // res.send(meal);

  // let meal = await Product.find(bodyObj);
  // }

  // meal = await Product.find({ location: req.body.location });
  // let meal = await Product.find({ location: req.body.location, costForTwo: { $gt: conditionNo } });
  // let meal = await Product.find({costForTwo:{$gt : 500}});
  // } else {
  //     res.send({ result: "No meal Found" })
  // }
  // }
});

app.listen(5001);
