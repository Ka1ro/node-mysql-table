const DB_CONFIG = {
  host: '127.0.0.1',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'shop-test'
};

const MIMETypes = {
  '.html': "text/html",
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.css': 'text/css',
  '.js': "text/javascript",
}




module.exports = {
  DB_CONFIG: DB_CONFIG,
  MIMETypes: MIMETypes
}

