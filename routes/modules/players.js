// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Player model
const Player = require('../../models/player')

// routes setting
//  打造瀏覽New頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//將新增的資料存資料庫
router.post('/', (req, res) => {
  const userId = req.user._id // 在這裡使用 req
  // 將 userId 添加到 req.body 中
  req.body.userId = userId

  // 使用 Player.create
  Player.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error));
})


//  打造瀏覽資料頁面路由
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Player.findOne({ _id, userId })
    .lean()
    .then((players) => res.render('show', { players }))
    .catch(error => console.log(error))
})

//  打造瀏覽編輯頁面路由
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Player.findOne({ _id, userId })
    .lean()
    .then((player) => res.render('edit', { player }))
    .catch(error => console.log(error))
})

//控制編輯路由;
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  req.body.userId = userId
  Player.findByIdAndUpdate(_id, { ...req.body })//運用展開運算符號將 req.body 對象的所有屬性展開到新的對象中。
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//打造刪除路由
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id//取得網址上的識別碼，用來查詢使用者想刪除的項目
  return Player.findOne({ _id, userId })// 查詢資料
    .then(players => players.remove()) //刪除這筆資料
    .then(() => res.redirect('/'))//重新呼叫首頁
    .catch(error => console.log(error))
})




// 匯出路由模組
module.exports = router