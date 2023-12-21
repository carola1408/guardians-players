// players model schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const playerSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
  },
  position: {
    type: String,
  },
  member_num: {
    type: Number,
  },
  images: {
    show: String,
    index: String,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  educational_bkgd: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  position: String, // 新增 position 欄位
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})


module.exports = mongoose.model('Player', playerSchema)