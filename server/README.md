###  以前用vue+koa2 做了一个后台管理，近期想接触一下react,所以用koa2加React又重新写了个后台管理，koa2给我的感触就是当你从一个前端学node，你是缺少很多概念的，例如log，参数校验等....后期可能会转去学egg.js
> 查看 node 对 es6 支持情况

```
npm install -g es-checker
es-checker
```

> 给项目添加 import export:https://cnodejs.org/topic/5a03d817275684445195a973

> 添加权限校验 用到插件 koa-passport passport-local 结合 session koa-session

> 用到参数校验 koa-validator

> 操作数据库 mongoose

> 保存日志 koa-log4

> 写了一个关于登陆拦截以及参数校验拦截

```
app.use(async (ctx, next) => {
  // 拦截器
  if (ctx.originalUrl.indexOf('/api/') > -1) {
    if (!ctx.isAuthenticated()) {
      ctx.body = {
        code: 403,
        msg: `登录超时`
      }
    }
  } else {
    app.context.validator = true
    await next()
  }
  // 结合validator做参数校验
  if (errorMsg.length > 0) {
    ctx.body = {
      code: 400,
      msg: errorMsg.join(',')
    }
    errorMsg = []
  } else {
    app.context.validator = true
  }
});
```
