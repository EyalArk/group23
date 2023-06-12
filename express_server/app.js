const express = require('express');
const app = express();
const path = require('path');
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
    res.cookie ("id",req.body.id);
    res.cookie ("email",req.body.email);
    res.cookie ("psw",req.body.psw);
    res.cookie ("name",req.body.name);
    res.cookie ("phone",req.body.phoneNum);
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


app.post('/signInUser', (req, res) => {
    const { loginEmail, loginPsw } = req.body; // Extract email and password from the request body

    const q3 = "SELECT * FROM users WHERE email = ? AND psw = ?";
    res.cookie('email', loginEmail);
    res.cookie('psw', loginPsw);
    let  a = loginEmail;
    let b = loginPsw;
    sql.query(q3, [a, b], (err, sqlres) => {
        if (err) {
            console.log("error in q3:", err);
            res.status(400).send({ message: "Sign-in failed. Please try again." });
            return;
        }

        if (sqlres.length > 0) {
            // User exists, redirect to the homepage
            res.redirect('/homepage');

        } else {
            // User does not exist, display an error message
            res.status(401).send({ message: "not exist: " + sqlres.length });
        }
    });
});


app.listen(port, ()=> {
    console.log("Server is running on port:",port);
})

