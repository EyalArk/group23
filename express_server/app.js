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
const CreateDB_CRUD = require('./db/CreateDB_CRUD');
const csv = require('csvtojson');

//Link to CRUD the Data Base
app.get('/createDB',(req,res)=>{
    res.render('createDB');
});

app.get('/',(req,res) => {
    res.render('signIn');
});

app.get('/aboutUs',(req,res) => {
    res.render('aboutUs');
});
app.get('/contactUs',(req,res) => {
    res.render('contactUs');
});
app.get('/homePage',(req,res) => {
    const loggedInUserName = req.cookies.name
    res.render('homePage',{ loggedInUserName });
});

app.get('/SignIn',(req,res) => {
    res.render('signIn');
});

app.get('/SignUp',(req,res) => {
    res.render('signUp');
});

app.get('/SignOut',(req,res) => {
    res.clearCookie("id")
    res.sendFile(path.join(__dirname,"views/signIn.html"));
});

app.get('/details',(req,res) => {
    res.render('details');
});


//create tables in DB
app.get('/createTables', CreateDB_CRUD.createTables);

//drop Tables in DB
app.get('/dropTables', CreateDB_CRUD.dropTables);

//All CRUD and functions in the site - URL for direct access
app.post('/UserSignUp', crud.createNewUser);
app.post('/signInUser',crud.userLogin);
app.get('/InsertDataToUsers',crud.InsertDataToUsers);
app.get('/InsertDataToOrders',crud.InsertDataToOrders);
app.get('/InsertDataToProducts',crud.InsertDataToProducts);
app.get('/addToCart/:productId', crud.addToCart);
app.get('/addOrder', crud.addOrder)
app.get('/users2', crud.displayUsers)
app.get('/myOrder', crud.displayUserOrders)
app.get('/products', crud.displayProducts)
app.get('/myCart', crud.displayCart)
app.get('/products55', crud.searchProduct)
app.get('/Nike', crud.filterNike)
app.get('/NewBalance', crud.filterNewBalance)
app.get('/Yeezy', crud.filterYeezy)
app.get('/All', crud.showAll)
app.get('/clearCart', crud.clearCart)
app.get('/removeFromCart/:cartId' , crud.removeFromCart)

app.listen(port, ()=> {
    console.log("Server is running on port:",port);
})
