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
