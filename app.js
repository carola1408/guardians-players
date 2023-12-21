// require packages used in the project
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')


// 引用路由器
const routes = require('./routes')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}



require('./config/mongoose')
const app = express()



// 載入 method-override
const methodOverride = require('method-override')
const flash = require('connect-flash')

// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const PORT = process.env.PORT || 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

const moment = require('moment')
// setting template engine
//定義要使用的樣板引擎
app.engine('hbs', exphbs({
  helpers: {
    formatDate: function (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  },
  defaultLayout: 'main', extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))


// setting static files
app.use(express.static('public'))

// setting body-parser
app.use(express.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
//設定本地變數 res.locals
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})
// 將 request 導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
