const http = require('node:http');
const querystring = require('querystring');
const fs = require('node:fs/promises');

function loginPage(res){
  fs.readFile('./templates/pages/login.html', {encoding:'utf-8'}).then(page=>{
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
  })
};
function checkLogin(req, res){
  let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const parsedBody = querystring.parse(body);
            const username = parsedBody.username;
            const password = parsedBody.password;

            // Примитивная проверка логина и пароля
            if (username === 'admin' && password === 'password') {
                res.writeHead(302, { 'Location': '/welcome' });
                res.end();
            } else {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Invalid credentials');
            }
          });
}

const server = http.createServer((req, res)=>{
  console.log(req.url);
    if (req.method === 'GET' && req.url === '/') {
      loginPage(res)
      res.writeHead(200, { 'Content-Type': 'text/html' });
      // res.end(html)
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

}).listen(3001);
