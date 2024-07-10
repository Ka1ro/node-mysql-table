const http = require('node:http');
const fs = require('node:fs/promises');
const sendQuery = require('./db/dbConncection');


const server = http.createServer((req,res)=>{
  if(req.url = '/'){
    drawTable(pathToPage, pathToTemp).then(html=>{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(html);
    })
  }
  else{
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404');
  }
}).listen(3001);

const pathToPage = './main.html';
const pathToTemp = './table_temp.html';

function loadHtml(pathToPage){
  return new Promise((resolve, reject)=>{
    try {
      let htmlPage = fs.readFile(pathToPage, {encoding : "utf-8"});
      resolve(htmlPage); 
    } catch (error) {
      reject(error);
    }
  });
};

function drawTable(pathToPage, pathToTemp, rows=3, query = `SELECT * FROM products`,){
  return new Promise((resolve, reject)=>{
    fs.readFile(pathToTemp, {encoding: 'utf-8'}).then(template=>{
      loadHtml(pathToPage).then(html=>{
          sendQuery(query).then(db=>{
            const regEx = /{{\w*}}/g;
            // const reps = 3;
            let tableColumns = template.match(regEx);
            let tempCopy = '';
            let tables = '';
            for(let i =0; i<rows; i++){
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