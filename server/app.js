const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const index = require('./routes/index');
const user = require('./routes/user');
const products = require('./routes/products');
const product = require('./routes/product');
require('babel-core/register');
/**
 * shanks 配置
 */
const mongoose = require('mongoose');
const dbConfig = require('./database/config');
const session = require('koa-session')
const validator = require('koa-validator')
const {
  applicationLogger,
  accessLogger
} = require('./config/logger');
/**
 * passport
 */
const passport = require('./routes/utils/passport');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
);


// 记录日志
app.use(accessLogger());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//mongoose
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error22:'));
db.once('open', function () {
  console.log('connect');
});

//session 
app.keys = ['secret']
app.use(session({}, app))

// passport
app.use(passport.initialize())
app.use(passport.session())


// validator
let errorMsg = []
app.use(validator({
  onValidationError: function (errMsg) {
    errorMsg.push(errMsg)
    app.context.validator = false
  }
}))

// 拦截器
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



// routes
app.use(index.routes(), index.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(products.routes(), products.allowedMethods());
app.use(product.routes(), product.allowedMethods());



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
  applicationLogger.error(err);
});
require('babel-register')({
  plugins: ['babel-plugin-transform-es2015-modules-commonjs'],
});
module.exports = app;
