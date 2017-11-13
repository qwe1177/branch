const express = require('express')
const path=require('path');
const bodyParser = require('body-parser')


const index = require('./routers/index')

const app = express()
const port = process.env.PORT || 3333

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'dist')));//指向编译后的HTML文件目录

//配置允许跨域
app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();  
});  

app.use('/testApi', index);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

module.exports = app