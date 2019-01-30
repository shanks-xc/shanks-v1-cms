module.exports = {
  dbs: `mongodb://127.0.0.1:27017/shanksv1`,
  redis: {
    get host() {
      retun `127.0.0.1`
    },
    get post() {
      return 6379
    }
  },
  smtp: {
    get host() {
      return `smtp.qq.com`
    },
    get user() {
      return `574752304@qq.com`
    },
    get pass() {
      return `ucepdkwglqcdbdgc`
    },
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase()
      }
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 1000
      }
    }
  }
}
