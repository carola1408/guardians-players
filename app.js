// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose

const app = express()
mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB mongoose.connect 是 Mongoose 提供的方法，


// 設定首頁路由
app.get('/', (req, res) => {
  res.send('hello world')

})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})