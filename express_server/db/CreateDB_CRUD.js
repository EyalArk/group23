const sql = require('./db');
const CreateTable = (req,res)=>{
  const q3 = 'CREATE TABLE IF NOT EXISTS users (email varchar(255) NOT NULL, psw int, name VARCHAR(255), phone int(255))';
  sql.query(q3, (err, mysqlres)=>{
      if (err) throw err;
      res.send("Table created:")
    });
};

const DropTable = (req,res)=>{
    const q4 = 'DROP TABLE users';
    sql.query(q4, (err, mysqlres)=>{
        if (err) throw err;
        res.send("Table dropped")
    });
};

module.exports={CreateTable,DropTable};
