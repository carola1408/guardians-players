const mongoose = require('mongoose') // 載入 mongoose
const Schema = mongoose.Schema
const playerSChema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String, // 資料型別是字串
    require: true // 這是個必填欄位
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  position: {
    type: String,
  },
  memberNumber: {
    type: String,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,

  },
  educationalBackground: {
    type: String,
  },
  birthday: {
    type: String,
  }
})

module.exports = mongoose.model('Player', playerSChema)