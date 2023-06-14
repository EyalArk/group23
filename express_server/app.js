const express = require('express');
const app = express();
const path = require('path');
const crud = require("../express_server/static/crud");
const port = 3000;
const BodyParser = require("body-parser");
app.use(BodyParser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"static")));
app.use(BodyParser.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
const sql = require('../express_server/db/db');
const createDBCRUD = require('./db/CRUDDB');

// app.get('/CRUD',createDBCRUD.createTable);

app.get('/',(req,res) => {
     res.sendFile(path.join(__dirname,"views/signIn.html"));
})
app.get('/aboutUs',(req,res) => {
    // res.sendFile(path.join(__dirname,"views/aboutUs.html"));
    res.render('aboutUs');
})
app.get('/contactUs',(req,res) => {
    // res.sendFile(path.join(__dirname,"views/contactUs.html"));
    res.render('contactUs');
})
app.get('/homePage',(req,res) => {
    // res.sendFile(path.join(__dirname,"views/homePage.html"));
    res.render('homePage');

})
app.get('/myCart',(req,res) => {
    // res.sendFile(path.join(__dirname,"views/myCart.html"));
    res.render('myCart');

})
app.get('/myOrder',(req,res) => {
    // res.sendFile(path.join(__dirname,"views/myOrder.html"));
    res.render('myOrder');
})

app.get('/products',(req,res) => {
    // res.sendFile(path.join(__dirname,"views/products.html"));
    res.render('products');
})
app.get('/SignIn',(req,res) => {
    // res.sendFile(path.join(__dirname,"views/signIn.html"));
    res.render('signIn');
})

app.get('/SignUp',(req,res) => {
    // res.sendFile(path.join(__dirname,"views/signUp.html"));
    res.render('signUp');
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
