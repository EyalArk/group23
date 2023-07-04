const sql = require("../db/db");
const path = require('path');
const csv=require('csvtojson');


const createNewUser = (req, res) => { //Create new user function
    if (!req.body) {
        res.status(400).send({ message: "Form can't be empty" });
        return;
    }
    const newUser = {
        email: req.body.email,
        psw: req.body.psw,
        name: req.body.name,
        phone: req.body.phoneNum
    };
    const checkExistingUserQuery = "SELECT * FROM users WHERE email = ?"; //check if user exsits
    sql.query(checkExistingUserQuery, newUser.email, (err, result) => {
        if (err) {
            res.status(500).send({ message: "An error occurred, please try again" });
            return;
        }
        if (result.length > 0) { //check for email failed already have in the database
            res.send(`<script> alert('Email already in use, Please try a different Email');
                    window.location.href = '/SignUp';
                </script>
            `);
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
            console.log("Created new user:"); //creating new user cookies
            res.cookie("email", req.body.email);
            res.cookie("psw", req.body.psw);
            res.cookie("name", req.body.name);
            res.cookie("phone", req.body.phoneNum);
            res.redirect("/SignIn");
        });
    });
};

const userLogin = (req, res) => {  //function for users login
    const { loginEmail, loginPsw } = req.body;
    const q3 = "SELECT * FROM users WHERE email = ? AND psw = ?";
    res.cookie("email", loginEmail); //save cookies
    res.cookie("psw", loginPsw);
    let a = loginEmail;
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
            res.send(`<script> window.location.href = '/homepage'; </script> `);
        } else {
            res.send(`<script> alert('Login Failed! Please Try again'); //pop message for failed login
                    window.location.href = '/SignIn';
                </script>
            `);}
    });}

const showUsers = (req, res) => { //function to show all the users in the database
    const q2 = "SELECT * FROM users";
    sql.query(q2, (err, sqlres) => {
        if (err) {
            console.log("error in q2:", err);
            res.status(400).send({ message: "Can't show all users" });
            return;}
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
                    console.log("created row in DB");
                });
            });
        })
    res.send("data read")
};

const InsertDataToProducts = (req,res)=>{ //function to add the data into products table
    const Q5 = "INSERT INTO products SET ?";
    const csvFilePath= path.join(__dirname, "../content/products.csv");
    console.log("CSV File Path:", csvFilePath);
    csv().fromFile(csvFilePath).then((jsonObj)=>{
            jsonObj.forEach(element => {
                sql.query(Q5, element, (err,mysqlres)=>{
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row in DB");
                });
            });
        })
    res.send("data read")
};

const InsertDataToOrders = (req,res)=>{ //function to add the data into orders table
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
                    console.log("created row in DB");
                });
            });
        })
    res.send("data read")
};

const addToCart = (req, res, next) => {  //function to add products to the cart
    const userEmail = req.cookies.email;
    const productId = req.params.productId;
    res.cookie('productId', productId);
    const selectCartQuery = `SELECT quantity FROM cart WHERE userEmail = ? AND productId = ?`;
    sql.query(selectCartQuery, [userEmail, productId], (err, result) => {
        if (err) {
            console.error('Error retrieving cart:', err);
            res.status(500).send('Error retrieving cart');
            return;
        }
        if (result.length > 0) { //update quantity if product is already in the cart
            const updateCartQuery = `UPDATE cart SET quantity = quantity + 1 WHERE userEmail = ? AND productId = ?`;
            sql.query(updateCartQuery, [userEmail, productId], (err, result) => {
                if (err) {
                    console.error('Error updating cart:', err);
                    res.status(500).send('Error updating cart');
                    return;
                }
                console.log('Product quantity updated in cart successfully');
                res.redirect('/products');
            });
        } else {
            // The product is not in the cart, add it
            const addToCartQuery = `INSERT INTO cart (userEmail, productId) VALUES (?, ?)`;
            sql.query(addToCartQuery, [userEmail, productId], (err, result) => {
                if (err) {
                    console.error('Error adding product to cart:', err);
                    res.status(500).send('Error adding product to cart');
                    return;
                }
                res.send(`<script> alert('Product Added To Cart!');
                    window.location.href = '/products';
                </script>
            `);
            });
        }
    });
};

const removeFromCart = (req, res) => { //function to remove products from the cart
    const cartId = req.params.cartId;
    const selectCartQuery = `SELECT quantity FROM cart WHERE cartId = ?`;
    sql.query(selectCartQuery, [cartId], (err, result) => {
        if (err) {
            console.error('Error retrieving cart:', err);
            res.status(500).send('Error retrieving cart');
            return;
        }
        const quantity = result[0].quantity;
        if (quantity > 1) {
            const updateQuantityQuery = `UPDATE cart SET quantity = quantity - 1 WHERE cartId = ?`;
            sql.query(updateQuantityQuery, [cartId], (err, result) => {
                if (err) {
                    console.error('Error updating quantity in cart:', err);
                    res.status(500).send('Error updating quantity in cart');
                    return;
                }
                console.log('Quantity updated in cart successfully');
                res.redirect('/myCart');
            });
        } else {
            const removeFromCartQuery = `DELETE FROM cart WHERE cartId = ?`;
            sql.query(removeFromCartQuery, [cartId], (err, result) => {
                if (err) {
                    console.error('Error removing product from cart:', err);
                    res.status(500).send('Error removing product from cart');
                    return;
                }
                console.log('Product removed from cart successfully');
                const reassignCartIdsQuery = `ALTER TABLE cart AUTO_INCREMENT = 1`;
                sql.query(reassignCartIdsQuery, (err, result) => {
                    if (err) {
                        console.error('Error reassigning cartId values:', err);
                        res.status(500).send('Error reassigning cartId values');
                        return;
                    }
                    console.log('CartId values reassigned successfully');
                    res.redirect('/myCart');
                });
            });
        }
    });
};

const addOrder = (req, res) => { //function to add orders to orders table and DB
    const userEmail = req.cookies.email;
    const calculateTotalPriceQuery = `SELECT SUM(p.price * c.quantity) AS total FROM cart c JOIN products p ON c.productId = p.productId WHERE c.userEmail = ?`;
    console.log('Before executing calculateTotalPriceQuery');
    sql.query(calculateTotalPriceQuery, [userEmail], (err, result) => {
        if (err) {
            console.error('Error calculating total price:', err);
            res.status(500).send('Error calculating total price');
            return;
        }
        const totalPrice = result[0].total;
        console.log('Total Price:', totalPrice);
        const insertOrderQuery = `INSERT INTO orders (date, totalPrice, userEmail) VALUES (CURDATE(), ?, ?)`;
        console.log('Before executing insertOrderQuery');
        sql.query(insertOrderQuery, [totalPrice, userEmail], (err, result) => {
            if (err) {
                console.error('Error adding order:', err);
                res.status(500).send('Error adding order');
                return;
            }
            const clearCartQuery = `DELETE FROM cart WHERE userEmail = ? `;
            sql.query(clearCartQuery, [userEmail], (err, result) => {
                if (err) {
                    console.error('Error clearing cart:', err);
                    res.status(500).send('Error clearing cart');
                    return;
                }
                console.log('Order added successfully');
                res.redirect('/myOrder');
            });
        });
    });
};
const clearCart = (req,res) => { //function to clear all products from the cart
    const userEmail = req.cookies.email;
    const clearCartQuery = `DELETE FROM cart WHERE userEmail = ?`;
    sql.query(clearCartQuery, [userEmail], (err, result) => {
        if (err) {
            console.error('Error clearing cart:', err);
            res.status(500).send('Error clearing cart');
            return;
        }
        console.log("Succses cleaning cart")
    });
    res.redirect('/myCart');

}

const searchProduct = (req, res) => { //function to search products in search bar - by name
    const searchQuery = req.query.search; // Get the search query from the URL parameter
    if (searchQuery) {
        res.cookie('searchQuery', searchQuery, { maxAge: 86400000 }); // Cookie expires after 24 hours
        const query = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'`;
        console.log('Executing search query:', query);
        sql.query(query, (err, results) => {
            if (err) {
                console.error('Error retrieving products:', err);
                res.status(500).send('An error occurred while retrieving products');
                return;
            }
            res.render('products', { products: results });
        });
    } else {
        const query = 'SELECT * FROM products';
        sql.query(query, (err, results) => {
            if (err) {
                console.error('Error retrieving products:', err);
                res.status(500).send('An error occurred while retrieving products');
                return;
            }
            res.render('products', { products: results });
        });
    }
};

const filterNike = (req, res) => { //function to filter products by brand
    const query = "SELECT * FROM products WHERE brand = 'Nike' ";
    sql.query(query, (err, results) => {
        if (err) {
            console.log("error in q2:", err);
            res.status(400).send({ message: "Can't show all users" });
            return;
        }
        res.render('products', { products: results });
        return;
    });
};

const filterNewBalance = (req, res) => {
    const query = "SELECT * FROM products WHERE brand = 'New Balance' ";
    sql.query(query, (err, results) => {
        if (err) {
            console.log("error in q2:", err);
            res.status(400).send({ message: "Can't show all users" });
            return;
        }
        res.render('products', { products: results });
        return;
    });
};

const filterYeezy = (req, res) => {
    const query = "SELECT * FROM products WHERE brand = 'Yeezy' ";
    sql.query(query, (err, results) => {
        if (err) {
            console.log("error in q2:", err);
            res.status(400).send({ message: "Can't show all users" });
            return;
        }
        res.render('products', { products: results });
        return;
    });
};

const showAll = (req, res) => { //function to show all the products in the DB
    const query = "SELECT * FROM products ";
    sql.query(query, (err, results) => {
        if (err) {
            console.log("error in q2:", err);
            res.status(400).send({ message: "Can't show all users" });
            return; }
        res.render('products', { products: results });
        return;
    });
};

const displayUserOrders= (req,res) =>{
    const userEmail = req.cookies.email;
    const query = 'SELECT * FROM orders WHERE userEmail = ?';

    sql.query(query, [userEmail], (err, results) => {
        if (err) {
            console.error('Error retrieving orders:', err);
            res.status(500).send('An error occurred while retrieving orders');
            return;
        }
        res.render('myOrder', { orders: results });
    });
}

const displayProducts = (req,res) =>{
    const query = 'SELECT * FROM products';
    sql.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving products:', err);
            res.status(500).send('An error occurred while retrieving products');
            return;
        }
        res.render('products', { products: results });
    });
}

const displayCart = (req,res) =>{
    const query = ' SELECT c.cartId , c.productId ,p.productId ,c.quantity, p.name, p.image1, p.image1, p.price\n' +
        '    FROM cart c\n' +
        '    JOIN products p ON c.productId = p.productId ';

    sql.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving cart:', err);
            res.status(500).send('An error occurred while retrieving myCart');
            return;
        }
        res.render('myCart', { cart: results });
    });
}

const displayUsers = (req,res) => {
    const query = 'SELECT * FROM users';
    sql.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving users:', err);
            res.status(500).send('An error occurred while retrieving users');
            return;
        }
        res.render('users2', { users: results });
    });
}

module.exports = {createNewUser,userLogin, showUsers,InsertDataToUsers,displayUsers,
     InsertDataToProducts,displayProducts, InsertDataToOrders,displayUserOrders,
    addToCart , searchProduct, filterNike,filterNewBalance,filterYeezy, showAll,
    removeFromCart, addOrder, clearCart, displayCart};

