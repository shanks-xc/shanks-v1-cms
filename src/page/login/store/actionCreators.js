import * as constants from './constants';

/**
 * 创建action 在页面dispath(changeAuthen('true')),然后到reducer里面做业务处理
 */

// 改变登陆状态
export const changeAuthen = value => ({
  type: constants.LOGIN_IS_AUTHEN,
  value
})
