// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Player model
const Player = require('../../models/player')
const playerList = require('../../models/seeds/players.json')

//根據中文類別名稱找到相對應的英文名稱
const categoryMappings = {
  '教練': '教練',
  '投手': '投手',
  '捕手': '捕手',
  '內野手': '內野手',
  '外野手': '外野手',
}
//建立一個排序選單
const sorts = [
  { sortName: "全部", sortBy: "default" },
  ...Object.keys(categoryMappings).map(category => ({ sortName: category, sortBy: category }))
]
// routes setting
//  首頁
router.get('/', (req, res) => {
  const userId = req.user._id   // 變數設定
  Player.find({ userId }) // 取出 Player model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })//根據 _id 升冪排序
    .then(players => res.render('index', { players, sorts })) // 將資料傳給 index 樣板
    .catch(error => console.error(error))// 錯誤處理

})

//打造搜尋路由
router.get('/search', (req, res) => {
  const keyword = req.query.keyword

  const players = playerList.results.filter(player => {
    return player.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  })
  res.render('index', { players: players, keyword: keyword })
})


//  功能：首頁排序功能
router.get('/sort/:sortBy', (req, res) => {
  const sortBy = req.params.sortBy;

  // 檢查 sortBy 是否存在於類別對應表中
  if (categoryMappings.hasOwnProperty(sortBy)) {
    const category = categoryMappings[sortBy]

    // 使用類別排序
    Player.find({ category })
      .lean()
      .then(players => res.render('index', { players, sorts }))
      .catch(error => console.error(error));
  } else {
    // 其他排序邏輯，比如 A 到 Z 或 Z 到 A
    let sort = {};
    if (sortBy === '全部') {
      sort = { _id: 'asc' };
    }

    // 使用其他排序
    Player.find()
      .lean()
      .sort(sort)
      .then(players => res.render('index', { players, sorts }))
      .catch(error => console.error(error));
  }
})

// 匯出路由模組
module.exports = router