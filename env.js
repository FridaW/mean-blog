const fs = require('fs');

if (fs.existsSync('./public')) {
  process.env.NODE_ENV = 'production';
  //process.env.databaseUri = 'mongodb://patel:patel@ds153752.mlab.com:53752/angular-2-app'; // Databse URI and database name
  process.env.databaseLocalUri = 'mongodb://patel:patel@ds153752.mlab.com:53752/angular-2-app';
  process.env.databaseName = 'production database: angular-2-app'; // Database name
} else {
  process.env.NODE_ENV = 'development';
  process.env.databaseUri = 'mongodb://Frida-Ryan:mengmeng512@angularblog-shard-00-02-4lrga.mongodb.net:27017/mean-blog'; // Databse URI and database name
  process.env.databaseLocalUri = 'mongodb://localhost:27017/mean-angular-2'; // Databse URI and database name
  process.env.databaseName = 'development database: mean-angular-2'; // Database name
}
