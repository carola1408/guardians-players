const mongoose = require('mongoose') // 載入 mongoose
const Player = require('../player') // 載入 player model
const player = require('../player')
// 載入 JSON
const playerList = require('./player.json').results

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB mongoose.connect 是 Mongoose 提供的方法

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  player.create(playerList)
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      db.close()
    })
})