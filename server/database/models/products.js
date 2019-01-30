const mongoose = require("mongoose")
const Schema = mongoose.Schema
/**
 * parentsId 选择分类
 * title 标题
 * imgUrl 分类图片
 * description 描述
 * state 状态
 * createTime 创建时间
 */
const ProductsSchema = new Schema({
  parentsId: {
    type: Array,
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

}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

module.exports = mongoose.model("ProductLists", ProductsSchema)
