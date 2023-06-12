const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const crud = require("../express_server/static/crud");
const sql = require('../express_server/db/db');
const BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(BodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"static")));
app.use(BodyParser.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.get('/',(req,res) => {
     res.sendFile(path.join(__dirname,"views/signIn.html"));
    // res.render('index');
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
app.get('/SignOut',(req,res) => {
    res.clearCookie("id")
    res.sendFile(path.join(__dirname,"views/signIn.html"));
})

app.post('/UserSignUp', crud.createNewUser);
app.get('/showUsers',crud.showUsers);
app.post('/signInUser',crud.userLogin);


app.listen(port, ()=> {
    console.log("Server is running on port:",port);
})

