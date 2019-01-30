import React, {Component, Fragment} from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom';
import {connect} from 'react-redux';
import MenuItem from '../component/MenuItem';
import store from '../store';
import PageIndex from '../page/index/index';
import PageProducts from '../page/products';
import PageProduct from '../page/product';
import PageProductAll from '../page/product/product-all';
import PageArticles from '../page/articles';
import PageArticle from '../page/article';
import PageArticleAll from '../page/article/article-all';
import PageAddProducts from '../page/add/products';
import PageAddProduct from '../page/add/product';
import PageAddArticles from '../page/add/articles';
import PageAddArticle from '../page/add/article';
import PageLogin from '../page/login';
import PageNoMatch from '../page/noMatch';
class RouterComponent extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isAuthen: store.getState ().login.getIn (['isAuthen']),
    };
  }

  render () {
    const {isAuthen} = this.props;
    return (
      <Fragment>
        {isAuthen}
        {!isAuthen ? <Login /> : <Index />}
      </Fragment>
    );
  }
}

function Login () {
  return (
    <Fragment>
      <div />
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
      <Route path="/login" component={PageLogin} />
    </Fragment>
  );
}

function Index () {
  return (
    <Switch>
      <Route path="/login" exact component={PageLogin} />
      <MenuItem>
        <Switch>
          <Route path="/" exact component={PageIndex} />
          <Route path="/products/:id" exact component={PageProducts} />
          <Route path="/product/:id" exact component={PageProduct} />
          <Route path="/product-all" exact component={PageProductAll} />
          <Route path="/articles/:id" exact component={PageArticles} />
          <Route path="/article/:id" exact component={PageArticle} />
          <Route path="/article-all" exact component={PageArticleAll} />
          <Route path="/add/products" exact component={PageAddProducts} />
          <Route path="/add/product" exact component={PageAddProduct} />
          <Route path="/add/articles" exact component={PageAddArticles} />
          <Route path="/add/article" exact component={PageAddArticle} />
          <Route exact component={PageNoMatch} />
        </Switch>
      </MenuItem>
    </Switch>
  );
}

const mapState = state => ({
  isAuthen: state.login.getIn (['isAuthen']),
});

export default withRouter (connect (mapState) (RouterComponent));
