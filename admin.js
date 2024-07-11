const db = require('./db/dbConncection');
let sendQuery = require('./db/dbConncection');
const {drawTable} = require('./loaders');


function adminButtons(url, req, res){
  let body = ''
  req.on('data', chunk=>{
    body +=chunk.toString();
  });
  req.on('end', ()=>{
    if(url === '/btn-delete'){
      let query = `DELETE FROM products WHERE id=${body}`;
      try{
        sendQuery(query).then(resp=>console.log(resp))
        res.writeHead(302, { 'Location': '/welcome' });
        res.end();
      }catch(error){
        console.log("Error", error);
      }
    }
    // }else if(url === '/btn-edit'){
    //   
    // }
    else if(url === '/btn-add-product'){
        body = JSON.parse(body);
        let query = `INSERT INTO products (id, name, model, quantity, year, price) VAlUES (NULL, "${body.name}", "${body.model}", ${Number.isInteger(+body.available)?+body.available: 0}, "${Number.isInteger(+body.year)?+body.year: "Unknown"}", ${Number.isInteger(+body.price)?+body.price: 0})`;
        try{
          sendQuery(query).then(resp=>console.log(resp));
          res.writeHead(302, { 'Location': '/welcome' });
          res.end();
        }catch(error){
          console.log("Error", error);
        }
      }
  })
}

module.exports = {
  adminButtons: adminButtons
}