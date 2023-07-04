const sql = require('./db');
const createTables = (req, res, next) => {  // Function for create all the tables
    const q1 = `
    CREATE TABLE IF NOT EXISTS users (  
      email varchar(255) NOT NULL,
      psw int(8),
      name VARCHAR(255),
      phone VARCHAR(255),
       PRIMARY KEY (email)

    )`;

    const q2 = `
    CREATE TABLE IF NOT EXISTS orders ( 
      orderId int NOT NULL AUTO_INCREMENT,
      date DATE,
      totalPrice decimal(10, 2),
      userEmail varchar(255),
     PRIMARY KEY (orderId, userEmail),
        FOREIGN KEY (userEmail) REFERENCES users(email) ON DELETE CASCADE
    )`;

    const q3 = `
    CREATE TABLE IF NOT EXISTS products (
  productId int NOT NULL,
  name VARCHAR(255),
  fit VARCHAR(255),
  color1 VARCHAR(255),
  color2 VARCHAR(255),
  image1 VARCHAR(255),
  image2 VARCHAR(255),
  price decimal(10, 2),
  brand VARCHAR(255),
  PRIMARY KEY (productId),
  INDEX idx_productId (productId)
    )`;

    const q4 = `
CREATE TABLE IF NOT EXISTS cart (
  cartId INT NOT NULL AUTO_INCREMENT,
  userEmail VARCHAR(255),
  productId INT,
  quantity INT DEFAULT 1,
  PRIMARY KEY (cartId),
  FOREIGN KEY (userEmail) REFERENCES users(email),
  FOREIGN KEY (productId) REFERENCES products(productId),
  INDEX fk_userEmail_idx (userEmail)
)`;

    sql.query(q1, (err, mysqlres) => {
        if (err) {
            throw err;
        }

        sql.query(q2, (err, mysqlres) => {
            if (err) {
                throw err;
            }

        sql.query(q3, (err, mysqlres) => {
            if (err) {
                throw err;
            }
        sql.query(q4, (err, mysqlres) => {
            if (err) {
                throw err;
            }
    res.send("Tables created: users, orders, products, cart");
        });
     });
});
    });
};

    const dropTables = (req, res, next) => {

         const q4 = `DROP TABLE IF EXISTS cart`;
          const q3 = `DROP TABLE IF EXISTS products`;
        const q2 = `DROP TABLE IF EXISTS orders`;
        const q1 = `DROP TABLE IF EXISTS users`;

        sql.query(q4, (err, mysqlres) => {
            if (err) {
                throw err;
            }

            sql.query(q3, (err, mysqlres) => {
            if (err) {
                throw err;
            }

        sql.query(q2, (err, mysqlres) => {
            if (err) {
                throw err;
            }

        sql.query(q1, (err, mysqlres) => {
            if (err) {
                throw err;
            }
        res.send("Tables dropped: users, orders,products, cart");
                    });
                });
             });
        });
    };

module.exports={createTables,dropTables};
