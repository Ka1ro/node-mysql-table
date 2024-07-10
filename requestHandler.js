const url = require('url');
const http = require('node:http');
const fs = require('fs');
const querystring = require('querystring');

let {loadHtml, drawTable, loadStatic, loginPage } = require('./loaders');
let {checkLogin} = require('./login-validation');

module.exports = requestHandler = (req, res) => {
  // const url = req.url;
  if (req.method === 'GET' && req.url === '/') {
    loginPage(res)
  } 
  else if (req.method === 'POST' && req.url === '/login')  
  {
  checkLogin(req, res);
  } 
  else if (req.method === 'GET' && req.url === '/welcome') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to the protected page!</h1>');
  } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
  }
}
