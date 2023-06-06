const express = require('express');
const app = express();
const path = require('path');
const port = 3306;
const BodyParser = require("body-parser");
app.use(express.static(path.join(__dirname,"static")));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
const sql = require('../express_server/db/db');

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"views/signIn.html"));
})
app.get('/aboutUs',(req,res) => {
    res.sendFile(path.join(__dirname,"views/aboutUs.html"));
})
app.get('/contactUs',(req,res) => {
    res.sendFile(path.join(__dirname,"views/contactUs.html"));
})
app.get('/homePage',(req,res) => {
    res.sendFile(path.join(__dirname,"views/homePage.html"));
})
app.get('/myCart',(req,res) => {
    res.sendFile(path.join(__dirname,"views/myCart.html"));
})
app.get('/myOrder',(req,res) => {
    res.sendFile(path.join(__dirname,"views/myOrder.html"));
})
app.get('/products',(req,res) => {
    res.sendFile(path.join(__dirname,"views/products.html"));
})
app.get('/SignIn',(req,res) => {
    res.sendFile(path.join(__dirname,"views/signIn.html"));
})
app.get('/SignUp',(req,res) => {
    res.sendFile(path.join(__dirname,"views/signUp.html"));
})

app.post('/UserSignUp',(req,res) => {
    res.send("hiii");
})

app.listen(port, ()=> {
    console.log("Server is running on port:",port);
})
