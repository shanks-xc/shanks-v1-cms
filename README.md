## 项目  背景

- 为学习 react 以及 koa2,衍生出来的一个后台 cms
- 目前进度,前端部分页面基本确定->后端接口权限控制以及参数验证完成->等待有空再联调
- 目前没做注册页面，可以通过http://localhost:8888/user/signup这个接口传递nickname,username,password创建自己的账户 post 方法

## 运行前端项目

> 技术栈:react,redux,router4,ant-design

```
npm i
yarn start

```

## 运行后端项目

> 技术栈:koa2 passport koa-validator koa-log4 mongodb

```
// 记得要安装mongodb(可参考):http://www.runoob.com/mongodb/mongodb-tutorial.html
cd server
npm i
npm start
```

#### 前端 react 记录学习部分

> 创建项目

```
create-react-app
```

> 暴露内建配置

```
git add .
git git commit -am "Save before ejecting"
yarn run eject
```

> 该项目引用了 ant design [ant-design 官网 web](http://design.alipay.com/develop/web/react/use-with-create-react-app)

> 小技巧

- js 跳转路由

```
import createHistory from 'history/createBrowserHistory';
createHistory ().push (value.key);
```

> 利用 js 方法进行路由跳转:路由教程https://segmentfault.com/a/1190000011137828

```
withRouter高阶组件，提供了history让你使用~
this.props.history.push("/some/Path");
// 在需要用到的页面引入withRouter
export default withRouter(MyComponent);
```

- 引入富文本编辑器 react-quill

```
"quill-image-drop-module": "^1.0.3",
"react-quill": "^1.1.0",
```

11
