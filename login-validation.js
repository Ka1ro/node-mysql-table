const fs = require("node:fs/promises");
const querystring = require('querystring');

// function checkLogin(req, res){
//   let chunks = [];
//   req.on('data', (chunk)=>{
//     chunks.push(chunk);
//   });

//   req.on('end', ()=>{
//     const data = Buffer.concat(chunks);
//     let obj = JSON.parse(data.toString());
//     let {username, password} = obj;
//     console.log('got data ', obj);
//     if((username == 'admin') && (password == 'password')){
//       res.writeHead(302, {'Location': '/adminIn'});
//       res.write(JSON.stringify({"success": true}));
//       res.end();
//       return true;
//     }
//     else{
//       res.write(JSON.stringify({"success": false}));
//       res.end();
//       return false;
//     }
//   });
// }

function checkLogin(req, res){
  let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const parsedBody = querystring.parse(body);
            const username = parsedBody.username;
            const password = parsedBody.password;

            if (username === 'admin' && password === 'password') {
                res.writeHead(302, { 'Location': '/welcome' });
                res.end();
            } else {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Invalid credentials');
            }
          });
}

module.exports = {
  checkLogin: checkLogin
}