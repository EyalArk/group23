const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
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
if (!req.body){
    res.status(400).send({message:"form cant be empty"});
    return;
}
const newUser = {
    "id": req.body.id,
    "email": req.body.email,
    "psw": req.body.psw,
    "name": req.body.name,
    "phone": req.body.phoneNum
}
const q1 = "insert into users set ?";
sql.query(q1,newUser,(err,sqlres)=>{
    if(err){
        console.log("error in q1:",err);
        res.status(400).send({message:"New User sign up didn't work, Please try again"});
        return;
    }
    console.log("created new user:", {id:sqlres.insertId});
     res.redirect('/SignIn');
    return;
});
});

const showUsers = (req, res) => {
    const q2 = "SELECT * FROM users";
    sql.query(q2, (err, sqlres) => {
        if (err) {
            console.log("error in q2:", err);
            res.status(400).send({ message: "Can't show all users" });
            return;
        }
        res.send(sqlres);
        return;
    });
};
app.get('/showUsers',showUsers);

app.listen(port, ()=> {
    console.log("Server is running on port:",port);
})

