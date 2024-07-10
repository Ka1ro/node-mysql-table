const http = require('node:http');
const requestHandler  = require('./requestHandler');
const {loginPage } = require('./loaders');


let server = http.createServer((req, res)=>{
  if(req.url == '/'){
    loginPage(res);
  } else{
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }   
}).listen(3001);



