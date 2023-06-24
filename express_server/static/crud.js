const sql = require("../db/db");
const path = require('path');
const csv=require('csvtojson');


// const createNewUser = (req,res) => {
//     if (!req.body){
//         res.status(400).send({message:"form cant be empty"});
//         return;
//     }
//     const newUser = {
//         "email": req.body.email,
//         "psw": req.body.psw,
//         "name": req.body.name,
//         "phone": req.body.phoneNum
//     }
//     const q1 = "insert into users set ?";
//     sql.query(q1,newUser,(err,sqlres)=>{
//         if(err){
//             console.log("error in q1:",err);
//             res.status(400).send({message:"New User sign up didn't work, Please try again"});
//             return;
//         }
//         console.log("created new user:", {id:sqlres.insertId});
//         res.cookie ("email",req.body.email);
//         res.cookie ("psw",req.body.psw);
//         res.cookie ("name",req.body.name);
//         res.cookie ("phone",req.body.phoneNum);
//         res.redirect('/SignIn');
//         return;
//     });
// }

const createNewUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Form cannot be empty" });
        return;
    }

    const newUser = {
        email: req.body.email,
        psw: req.body.psw,
        name: req.body.name,
        phone: req.body.phoneNum
    };

    const checkExistingUserQuery = "SELECT * FROM users WHERE email = ?";
    sql.query(checkExistingUserQuery, newUser.email, (err, result) => {
        if (err) {
            console.log("Error checking existing user:", err);
            res.status(500).send({ message: "An error occurred, please try again" });
            return;
        }

        if (result.length > 0) {
            res.status(400).send({ message: "Email already exists" });
            return;
        }

        const createUserQuery = "INSERT INTO users SET ?";
        sql.query(createUserQuery, newUser, (err, sqlres) => {
            if (err) {
                console.log("Error creating new user:", err);
                res
                    .status(500)
                    .send({ message: "New user signup failed, please try again" });
                return;
            }

            console.log("Created new user:");
            res.cookie("email", req.body.email);
            res.cookie("psw", req.body.psw);
            res.cookie("name", req.body.name);
            res.cookie("phone", req.body.phoneNum);
            res.redirect("/SignIn");
        });
    });
};


//login to the site
const userLogin = (req, res) => {
    const {loginEmail, loginPsw} = req.body;
    const q3 = "SELECT * FROM users WHERE email = ? AND psw = ?";
    res.cookie("email", loginEmail);
    res.cookie("psw", loginPsw);
    let  a = loginEmail;
    let b = loginPsw;
    sql.query(q3, [a, b], (err, sqlres) => {
        if (err) {
            console.log("error in q3:", err);
            res.status(400).send({ message: "Sign-in failed. Please try again." });
            return;
        }
        if (sqlres.length > 0) {
            const user = sqlres[0];
            res.cookie("name", user.name);
            res.cookie("phone", user.phone);
            res.redirect('/homepage');
        } else {
            res.status(401).send({message: "not exist: " + sqlres.length});
        }
    });
}

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



const InsertDataToUsers = (req,res)=>{
    const Q1 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "../content/users.csv");
    console.log("CSV File Path:", csvFilePath);
    csv().fromFile(csvFilePath)
        .then((jsonObj)=>{
            jsonObj.forEach(element => {
                sql.query(Q1, element, (err,mysqlres)=>{
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("creared row sucssesfuly");
                });
            });
        })
    res.send("data read")
};

const InsertDataToProducts = (req,res)=>{
    const Q5 = "INSERT INTO products SET ?";
    const csvFilePath= path.join(__dirname, "../content/products.csv");
    console.log("CSV File Path:", csvFilePath);
    csv().fromFile(csvFilePath)
        .then((jsonObj)=>{
            jsonObj.forEach(element => {
                sql.query(Q5, element, (err,mysqlres)=>{
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("creared row sucssesfuly");
                });
            });
        })
    res.send("data read")
};


const InsertDataToOrders = (req,res)=>{
    const Q1 = "INSERT INTO orders SET ?";
    const csvFilePath= path.join(__dirname, "../content/orders.csv");
    console.log("CSV File Path:", csvFilePath);
    csv().fromFile(csvFilePath)
        .then((jsonObj)=>{
            jsonObj.forEach(element => {
                sql.query(Q1, element, (err,mysqlres)=>{
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("creared row sucssesfuly");
                });
            });
        })
    res.send("data read")
};

const showProducts = (req, res) => {
    const q6 = "SELECT * FROM products";
    sql.query(q6, (err, sqlres) => {
        if (err) {
            console.log("error in q2:", err);
            res.status(400).send({ message: "Can't show all users" });
            return;
        }
        res.send(sqlres);
        return;
    });
};

module.exports = {createNewUser,userLogin, showUsers,InsertDataToUsers,showProducts, InsertDataToProducts, InsertDataToOrders};






