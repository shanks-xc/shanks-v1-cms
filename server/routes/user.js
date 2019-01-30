const Router = require('koa-router');
const User = require('../database/models/user');
const Passport = require('./utils/passport');
let router = new Router({
  prefix: '/user',
});

/**
 * 注册接口
 * @params(nickname,username,password)
 */

router.post(`/signup`, async ctx => {
  // 校验请求参数
  ctx.checkBody('nickname', 'nickname不能为空').notEmpty()
  ctx.checkBody('username', 'username不能为空').notEmpty()
  ctx.checkBody('password', 'password不能为空').notEmpty()
  if (!ctx.validator) return
  let {
    nickname,
    username,
    password
  } = ctx.request.body;
  let user = await User.find({
    username,
  });
  if (user.length > 0) {
    ctx.body = {
      code: 400,
      data: {},
      msg: '已经被注册',
    };
    return;
  }
  try {
    let createUser = await User.create({
      nickname,
      username,
      password,
    });
    ctx.body = {
      code: 200,
      data: {},
      msg: '操作成功',
    };
  } catch (err) {
    ctx.body = {
      code: 500,
      data: {},
      msg: err.message,
    };
  }
});

/**
 * @params username:账号 
 * @params password:密码
 * ctx.session.passport 获取session内容
 */
router.post(`/signin`, async (ctx, next) => {
  return Passport.authenticate(`local`, function (error, user, info, status) {
    if (error) {
      ctx.body = {
        code: -1,
        msg: error,
      };
    } else {
      if (user) {
        ctx.body = {
          code: 200,
          msg: `登陆成功`,
          user,
        };
        return ctx.login(user);
      } else {
        ctx.body = {
          code: 500,
          data: {},
          msg: info,
        };
      }
    }
  })(ctx, next);
});

/**
 * 登出接口
 */
// 退出登陆
router.get(`/signout`, async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
      msg: `退出成功`
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

module.exports = router;
