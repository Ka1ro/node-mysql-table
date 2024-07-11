const http = require('node:http');
const requestHandler  = require('./requestHandler');
const {loginPage } = require('./loaders');


let server = http.createServer((req, res)=>{
  requestHandler(req, res);
  }   
).listen(3001);



