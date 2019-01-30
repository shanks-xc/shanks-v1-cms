const Router = require('koa-router');
const Product = require('../database/models/product');
let router = new Router({
  prefix: '/api/product',
});

/**
 * parentsId 选择分类
 * title 标题
 * imgUrl 分类图片
 * description 描述
 * state 状态
 * createTime 创建时间
 */

/**
 * 新增接口
 */
router.post(`/post`, async (ctx, next) => {
  console.log('shanks')
  let {
    parentsId,
    title,
    imgUrl,
    description,
    state,
    content
  } = ctx.request.body
  console.log(ctx.request.body)
  try {
    let createProducts = await Product.create({
      parentsId,
      title,
      imgUrl,
      description,
      state,
      content
    })
    ctx.body = {
      code: 200,
      data: {},
      msg: '保存成功'
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      data: {},
      msg: err.message
    }
  }

})

/**
 * 详情接口
 */
router.get(`/get/:id`, async (ctx, next) => {
  let id = ctx.params.id
  try {
    let data = await Product.findOne({
      _id: id
    })
    ctx.body = {
      code: 200,
      data: data,
      msg: '操作成功'
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      data: {},
      msg: err.message
    }
  }

})

/**
 * 更新接口
 */
router.put(`/put/:id`, async (ctx, next) => {
  let {
    parentsId,
    title,
    imgUrl,
    description,
    state
  } = ctx.request.body
  let id = ctx.params.id
  try {
    let data = await Product.updateOne({
      _id: id
    }, {
      parentsId,
      title,
      imgUrl,
      description,
      state
    })
    ctx.body = {
      code: 200,
      data: {},
      msg: '操作成功'
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      data: {},
      msg: err.message
    }
  }
})

/**
 * 删除接口
 */
router.delete(`/delete/:id`, async (ctx, next) => {
  let id = ctx.params.id
  try {
    let data = await Product.deleteOne({
      _id: id
    })
    ctx.body = {
      code: 200,
      data: {},
      msg: '操作成功'
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      data: {},
      msg: err.message
    }
  }
})

module.exports = router;
