const sql = require('./db');
// const CreateTable = (req,res)=>{
//   const q3 = 'CREATE TABLE IF NOT EXISTS users (email varchar(255) NOT NULL, psw int, name VARCHAR(255), phone int(255))';
//   sql.query(q3, (err, mysqlres)=>{
//       if (err) throw err;
//       res.send("Table created:")
//     });
// };


////////////


const createTables = (req, res, next) => {
    const q1 = `
    CREATE TABLE IF NOT EXISTS users (
      email varchar(255) NOT NULL,
      psw int(8),
      name VARCHAR(255),
      phone int(255)
    )`;

    const q2 = `
    CREATE TABLE IF NOT EXISTS orders (
      orderId int NOT NULL,
      date DATE,
      totalPrice decimal(10, 2)
    )`;

    const q3 = `
    CREATE TABLE IF NOT EXISTS products (
      productId int NOT NULL,
       name VARCHAR(255),
       fit  VARCHAR(255),
       color1 VARCHAR(255),
       color2 VARCHAR(255),
      image1 VARCHAR(255),
       image2 VARCHAR(255),
      price decimal(10, 2),
      brand VARCHAR(255),
      color VARCHAR(255)
    )`;

    const q4 = `
    CREATE TABLE IF NOT EXISTS cart (
    amount int,
      price decimal(10, 2)
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

            res.send("Tables created: users, orders,products,cart");
        });
    });
});
    });
};


    const dropTables = (req, res, next) => {
        const q1 = `DROP TABLE IF EXISTS users`;
        const q2 = `DROP TABLE IF EXISTS orders`;
        const q3 = `DROP TABLE IF EXISTS products`;
        const q4 = `DROP TABLE IF EXISTS cart`;

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

                res.send("Tables dropped: users, orders,products, cart");
                    });
                });
            });
        });
    };


module.exports={createTables,dropTables};
