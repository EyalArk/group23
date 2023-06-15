const sql = require("../db/db");

const createNewUser = (req,res) => {
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
}

//login to the site
const userLogin = (req, res) => {
    const {loginEmail, loginPsw} = req.body;
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

module.exports = {createNewUser,userLogin, showUsers};






