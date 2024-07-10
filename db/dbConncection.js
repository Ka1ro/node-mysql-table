const mysql = require('mysql');

const DB_CONFIG = {
  host: '127.0.0.1',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'shop-test'
};



module.exports = function sendQuery(query){
  return new Promise((resolve, reject)=>{
    let connection = mysql.createConnection(DB_CONFIG);
    connection.query(query, (error, data)=>{
      if(error) console.log(error);
      resolve(data);
      connection.end();
    });
  });
}
