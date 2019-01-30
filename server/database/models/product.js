const mongoose = require("mongoose")
const Schema = mongoose.Schema
/**
 * parentsId 选择分类
 * title 标题
 * imgUrl 分类图片
 * description 描述
 * state 状态
 * content 文章正文
 * createTime 创建时间
 */
const Productchema = new Schema({
  parentsId: {
    type: Array,
    ///unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  state: {
    type: Boolean,
    required: true
  },
  content: {
    type: String,
    required: true
  },

}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

module.exports = mongoose.model("Products", Productchema)
