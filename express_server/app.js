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
    const loggedInUserName = req.cookies.name
    res.render('homePage',{ loggedInUserName });

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
app.get('/InsertDataToUsers',crud.InsertDataToUsers);
app.get('/InsertDataToOrders',crud.InsertDataToOrders);
app.get('/InsertDataToProducts',crud.InsertDataToProducts);
app.get('/showProducts',crud.showProducts);

app.get('/users2', (req, res) => {
    const query = 'SELECT * FROM users';
    sql.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving users:', err);
            res.status(500).send('An error occurred while retrieving users');
            return;
        }

        res.render('users2', { users: results });
    });
});

app.get('/orders2', (req, res) => {
    const query = 'SELECT * FROM orders';
    sql.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving orders:', err);
            res.status(500).send('An error occurred while retrieving orders');
            return;
        }

        res.render('orders2', { orders: results });
    });
});

app.get('/products2', (req, res) => {
    const query = 'SELECT * FROM products';
    sql.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving products:', err);
            res.status(500).send('An error occurred while retrieving products');
            return;
        }

        res.render('products2', { products: results });
    });
});

// app.get('/getProducts', (req, res) => {
//     // Perform a query to retrieve the products from your SQL table
//     const query = 'SELECT * FROM products';
//
//     connection.query(query, (error, results) => {
//         if (error) {
//             console.error('Error executing MySQL query:', error);
//             res.sendStatus(500); // Send a 500 Internal Server Error status
//             return;
//         }
//
//         // Send the retrieved products as a JSON response
//         res.json(results);
//     });
// });











    //create tables in DB

app.get('/createTables', CreateDB_CRUD.createTables);
//drop Tables in DB
app.get('/dropTables', CreateDB_CRUD.dropTables);

//Link to create the Data Base
app.get('/createDB',(req,res)=>{
    res.render('createDB');
});

app.listen(port, ()=> {
    console.log("Server is running on port:",port);
})
