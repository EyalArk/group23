const sql = require('./db');
const CreateTable = (req,res)=>{
  const q3 = 'CREATE TABLE IF NOT EXISTS users (id INT(10) NOT NULL, name VARCHAR(255), email VARCHAR(255))';
  sql.query(q3, (err, mysqlres)=>{
      if (err) throw err;
      res.send("Table created:")
    });
};

const DropTable = (req,res)=>{
    const q4 = 'DROP TABLE table1';
    sql.query(q4, (err, mysqlres)=>{
        if (err) throw err;
        res.send("Table dropped")
    });
};

module.exports={CreateTable,DropTable};
