const sql = require("../db/db");
const path = require('path');
const csv=require('csvtojson');


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

const addToCart = (req, res, next) => {
    const userEmail = req.cookies.email;
    const productId = req.params.productId;

    res.cookie('productId', productId);

    const selectCartQuery = `
    SELECT quantity
    FROM cart
    WHERE userEmail = ? AND productId = ?
  `;

    sql.query(selectCartQuery, [userEmail, productId], (err, result) => {
        if (err) {
            console.error('Error retrieving cart:', err);
            res.status(500).send('Error retrieving cart');
            return;
        }

        if (result.length > 0) {
            // if the product already exists in cart,so update the quantity
            const updateCartQuery = `
        UPDATE cart
        SET quantity = quantity + 1
        WHERE userEmail = ? AND productId = ?
      `;

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
            const addToCartQuery = `
        INSERT INTO cart (userEmail, productId)
        VALUES (?, ?)
      `;

            sql.query(addToCartQuery, [userEmail, productId], (err, result) => {
                if (err) {
                    console.error('Error adding product to cart:', err);
                    res.status(500).send('Error adding product to cart');
                    return;
                }
                console.log('Product added to cart successfully');
                res.redirect('/products');
            });
        }
    });
};

const removeFromCart = (req, res) => {
    const cartId = req.params.cartId;

    const selectCartQuery = `
    SELECT quantity
    FROM cart
    WHERE cartId = ?
  `;

    sql.query(selectCartQuery, [cartId], (err, result) => {
        if (err) {
            console.error('Error retrieving cart:', err);
            res.status(500).send('Error retrieving cart');
            return;
        }

        // if (result.length === 0) {
        //     console.log('Cart item not found');
        //     res.redirect('/myCart');
        //     return;
        // }

        const quantity = result[0].quantity;

        if (quantity > 1) {
            // update quantity by -1
            const updateQuantityQuery = `
        UPDATE cart
        SET quantity = quantity - 1
        WHERE cartId = ?
      `;

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
            // Remove the product from cart
            const removeFromCartQuery = `
        DELETE FROM cart
        WHERE cartId = ?
      `;
            sql.query(removeFromCartQuery, [cartId], (err, result) => {
                if (err) {
                    console.error('Error removing product from cart:', err);
                    res.status(500).send('Error removing product from cart');
                    return;
                }

                console.log('Product removed from cart successfully');

                // Reassign cartId values for right row
                const reassignCartIdsQuery = `
          ALTER TABLE cart
          AUTO_INCREMENT = 1
        `;
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

const addOrder = (req, res) => {
    const userEmail = req.cookies.email;

    // Calculate the total price
    const calculateTotalPriceQuery = `
    SELECT SUM(p.price * c.quantity) AS total
    FROM cart c
    JOIN products p ON c.productId = p.productId
    WHERE c.userEmail = ?
  `;

    console.log('Before executing calculateTotalPriceQuery');
    sql.query(calculateTotalPriceQuery, [userEmail], (err, result) => {
        if (err) {
            console.error('Error calculating total price:', err);
            res.status(500).send('Error calculating total price');
            return;
        }

        const totalPrice = result[0].total;
        console.log('Total Price:', totalPrice);

        // Insert the order into the orders table
        const insertOrderQuery = `
      INSERT INTO orders (date, totalPrice, userEmail)
      VALUES (CURDATE(), ?, ?)
    `;

        console.log('Before executing insertOrderQuery');
        sql.query(insertOrderQuery, [totalPrice, userEmail], (err, result) => {
            if (err) {
                console.error('Error adding order:', err);
                res.status(500).send('Error adding order');
                return;
            }

            // Clear the cart for the user
            const clearCartQuery = `
        DELETE FROM cart
        WHERE userEmail = ?
      `;

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

const clearCart = (req,res) => {
    const userEmail = req.cookies.email;

    const clearCartQuery = `
        DELETE FROM cart
        WHERE userEmail = ?
      `;

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

const searchProduct = (req, res) => {
    const searchQuery = req.query.search; // Get the search query from the URL parameter

    // Check if the search query is provided
    if (searchQuery) {
        // Save the search query in a cookie
        res.cookie('searchQuery', searchQuery, { maxAge: 86400000 }); // Cookie expires after 24 hours

        // Construct the SQL query to search for products by name
        const query = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'`;
        console.log('Executing search query:', query); // Add console log message

        // Execute the query and render the results
        sql.query(query, (err, results) => {
            if (err) {
                console.error('Error retrieving products:', err);
                res.status(500).send('An error occurred while retrieving products');
                return;
            }
            res.render('products', { products: results });
        });
    } else {
        // If no search query is provided, render the products page without any filtering
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

const filterNike = (req, res) => {
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

const showAll = (req, res) => {
    const query = "SELECT * FROM products ";
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

