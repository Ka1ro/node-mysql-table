const url = require('url');
const http = require('node:http');
const fs = require('node:fs/promises');
const querystring = require('querystring');
const {adminButtons} = require('./admin');

let {loadHtml, drawTable, loadStatic, loginPage } = require('./loaders');
let {checkLogin} = require('./login-validation');

module.exports = requestHandler = (req, res) => {
  let url = req.url;
  console.log(url);

  if(req.method === "GET"){
    if(url ==='/'){
      drawTable(isAdmin=false).then(html=>res.end(html));
    } else if(url ==='/login'){
      loginPage(res)
    }
    else if(url ==='/welcome'){
      drawTable(isAdmin=true).then(html=>res.end(html));
    }
    else{
      loadStatic(url, req, res);
    }
  }
  else if(req.method === "POST"){
    if(url === '/enter'){
      checkLogin(req, res);
    }
    else if(url.split('-')[0] === '/btn'){
        adminButtons(url, req, res);
    }
    else{
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  }
}
