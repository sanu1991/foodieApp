const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({dest: 'uploads/'});

require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        { user ? res.send(user) : res.send({ result: "No user Found" }) }
    } else {
        res.send({ result: "No user Found" })
    }
})

app.post("/addProducts", upload.single('resImg'), async (req, res) => {
    console.log(req.body, req.file);
    
    const userId = req.body.userId;
    const resName = req.body.resName;
    const resImg = req.file.filename;
    const location = req.body.location;
    const state = req.body.state;
    const PhNo = req.body.PhNo;
    const cuisines = req.body.cuisines;
    const costForTwo = req.body.costForTwo;
    const menu = req.body.menu;

    const body = {userId, resName, resImg, location, state, PhNo, cuisines, costForTwo, menu}
    let product = new Product(body);
    // let product = new Product(req.body);
    let result = await product.save();
    result = result.toObject();
    // console.log(body,result)
    res.send(result);
})

app.get("/:id", async (req, res) => {
    let result = await Product.findOne({userId: req.params.id});
    res.send(result);
    // if(result.length > 0){
    //     res.send(result);
    // }else{
    //     res.send({result: "No products Found"});
    // }
})

app.put("/updateProducts/:id", async (req, res) => {
    // let product = new Product(req.body);
    let result = await Product.updateOne(
        {userId: req.params.id },
        { $set: req.body }
    );
    // result = result.toObject();
    res.send(result);
})

app.delete("/updateProducts/:id", async (req, res) => {
    let result = await Product.deleteOne({userId: req.params.id });
    res.send(result);
})

app.post("/", async (req, res) => {
    // let products = await Product.find();
    // if (products.length > 0) {
    //     res.send(products);
    // } else {
    //     res.send({ result: "No products Found" });
    // }

    let products = await Product.findOne(req.body);
    res.send(products);
})


app.listen(5000)




//  connect mongo db using mongoose
// const express = require("express");
// // const mongoose = require("mongoose");
// const app = express();
// app.get("/signup",(req,res)=>{
//     res.send("app is working...")
// });
// // const connectDB = async () => {
// //     mongoose.set("strictQuery", false);
// //     mongoose.connect('mongodb://0.0.0.0:27017/e-comm', { useNewUrlParser: true });
// //     // mongoose.connect(process.env.MONGO_URL);
// //     const productSchema = new mongoose.Schema({});
// //     const product = mongoose.model('products', productSchema);
// //     const data = await product.find();
// //     console.log(data);
// // }
// // connectDB();
// app.listen(5000)



// connect mongo db direct
// const {MongoClient} = require('mongodb');
// const url = 'mongodb://0.0.0.0:27017';
// const databaseName = "e-comm";
// const client = new MongoClient(url);
// async function getData(){
//     let result = await client.connect();
//     db = result.db(databaseName);
//     collection = db.collection('products');
//     let data = await collection.find({}).toArray();
//     console.log(data);
// }
// getData();


// create database
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://0.0.0.0:27017/mydb";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });