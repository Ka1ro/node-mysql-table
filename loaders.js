let sendQuery = require('./db/dbConncection');
let { MIMETypes }= require('./db/config');
const fs = require('node:fs/promises');
const nodePath = require('node:path');

function loadHtml(isAdmin){
  return new Promise((resolve, reject)=>{
    try {
      let path = (isAdmin)?'./templates/pages/main_admin.html' : './templates/pages/main.html'
      let htmlPage = fs.readFile(path, {encoding : "utf-8"});
      resolve(htmlPage); 
    } catch (error) {
      reject(error);
    }
  });
};


function loadStatic(url,req,res){
  let ext = nodePath.extname(url);
  if(ext in MIMETypes){
    res.setHeader("Content-Type", MIMETypes[ext]);
    fs.readFile(`./templates${url}`, {encoding: "utf-8"}).then(data=>{
      res.write(data);
      res.end();
    });
  }
  else{
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}

function drawTable(isAdmin = false, query){
  return new Promise((resolve, reject)=>{
    let path = (isAdmin)?'./templates/pages/table_admin_temp.html' : './templates/pages/table_temp.html'
    fs.readFile(path, {encoding: 'utf-8'}).then(template=>{
      loadHtml(isAdmin).then(html=>{
          sendQuery(`SELECT * FROM products`).then(db=>{
            const regEx = /{{\w*}}/g;
            const reps = db.length;
            // let db = [[1,2,3,4,5,6],[7,8,9,0,1,2],[3,4,5,6,7,8]];
            let tableColumns = template.match(regEx);
            let tempCopy = '';
            let tables = '';
            for(let i =0; i<reps; i++){
              tempCopy = template;
              tableColumns.forEach((el)=>{
                tempCopy = tempCopy.replace(el, db[i][el.slice(2, el.length-2)]);
              });
              tables+= tempCopy;
            }
            html = html.replace('{{data}}', tables);
            resolve(html);
          })

        })
      })
   })
}

function loginPage(res){
  fs.readFile('./templates/pages/login.html', {encoding:'utf-8'}).then(page=>{
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
  })
};

module.exports = {
  loadHtml: loadHtml,
  drawTable: drawTable,
  loadStatic: loadStatic,
  loginPage: loginPage
};

// sendQuery(`SELECT * FROM products`).then(data=>{
//   console.log(data[1]['id']);
// })
// drawTable().then(text=>{console.log(text)});
