const bcrypt = require('bcryptjs')
const Player = require('../player') // 載入 player model
const User = require('../users')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'SHE',
  email: 'she@test.com',
  password: '20010911'
}
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 載入 JSON
const playerList = require('../../models/seeds/players.json').results


// 連線成功
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      // 將 Player 種子數據加入
      console.log('playerSeeder done!')
      return Player.create(playerList.map(player => ({ ...player, userId })))
        .then(() => userId)
    })
    .catch(err => {
      console.trace(err)
      process.exit()
    })
})



