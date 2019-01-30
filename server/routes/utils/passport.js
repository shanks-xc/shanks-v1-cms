const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const User = require('../../database/models/user')

// 用户密码验证策略
passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log(username, password)
    User.findOne({
      username: username
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, '不存在该用户');
      }
      if (user.password !== password) {
        return done(null, false, '密码错误');
      }
      return done(null, user);
    });
  }
));
// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function (user, done) {
  console.log(user, 'serializeUser')
  done(null, user)
})

// deserializeUser 在每次请求的时候将从 session 中读取用户对象
passport.deserializeUser(function (user, done) {
  console.log(user, 'deserializeUser')
  return done(null, user)
})
module.exports = passport
