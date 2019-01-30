import React, {Component} from 'react';
import {Layout, Menu, Icon, Dropdown} from 'antd';
import createHistory from 'history/createBrowserHistory';
import {withRouter} from 'react-router-dom';
import HeaderItem from './HeaderItem';

import './style.css';
const SubMenu = Menu.SubMenu;
const {Header, Sider, Content} = Layout;
class MenuItem extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      collapsed: false,
      SelectedKeys: [],
      openKeys: [],
    };
    this.selectHandle = this.selectHandle.bind (this);
  }
  toggle = () => {
    this.setState ({
      collapsed: !this.state.collapsed,
    });
  };
  //侧栏打开回调
  onOpenChange = openKeys => {
    const state = this.state;
    const latestOpenKey = openKeys.find (
      key => !(state.openKeys.indexOf (key) > -1)
    );
    const latestCloseKey = state.openKeys.find (
      key => !(openKeys.indexOf (key) > -1)
    );

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys (latestOpenKey).concat (
        latestOpenKey
      );
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys (latestCloseKey);
    }
    this.setState ({
      openKeys: nextOpenKeys,
    });
  };
  getAncestorKeys = key => {
    const map = {};
    return map[key] || [];
  };
  selectHandle (value, b, c) {
    this.props.history.push (value.key);
  }
  render () {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{
            height: 'auto',
            minHeight: '100vh',
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            openKeys={this.state.openKeys}
            onClick={this.selectHandle}
            onOpenChange={this.onOpenChange}
            defaultSelectedKeys={this.state.SelectedKeys}
          >
            <SubMenu
              key="products"
              title={
                <span>
                  <Icon type="picture" />
                  <span> 产品分类 </span>
                </span>
              }
            >
              <Menu.Item key="/products/a"> 产品分类A </Menu.Item>
              <Menu.Item key="/products/b"> 产品分类B </Menu.Item>
            </SubMenu>
            <Menu.Item key="/product-all">
              <Icon type="switcher" /> <span>产品详情</span>
            </Menu.Item>
            <SubMenu
              key="articles"
              title={
                <span> <Icon type="file-text" /> <span> 文章分类 </span></span>
              }
            >
              <Menu.Item key="/articles/a"> 文章分类A </Menu.Item>
              <Menu.Item key="/articles/b"> 文章分类B </Menu.Item>
            </SubMenu>
            <Menu.Item key="/article-all">
              <Icon type="switcher" /> <span>文章详情</span>
            </Menu.Item>
            <SubMenu
              key="add"
              title={<span> <Icon type="file-add" /> <span> 添加管理 </span></span>}
            >
              <Menu.Item key="/add/products"> 添加产品分类 </Menu.Item>
              <Menu.Item key="/add/product"> 添加产品详情 </Menu.Item>
              <Menu.Item key="/add/articles"> 添加文章分类 </Menu.Item>
              <Menu.Item key="/add/article"> 添加文章详情 </Menu.Item>
            </SubMenu>
            <SubMenu
              key="user"
              title={<span> <Icon type="user" /> <span> 用户 </span></span>}
            >
              <Menu.Item key="/user"> 用户管理 </Menu.Item>
              <Menu.Item key="/user/role"> 角色管理 </Menu.Item>
            </SubMenu>
            <SubMenu
              key="config"
              title={<span> <Icon type="setting" /> <span> 设置 </span></span>}
            >
              <Menu.Item key="/setting/menu"> 菜单管理 </Menu.Item>
              <Menu.Item key="/setting/data"> 数据字典 </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <HeaderItem toggle={this.toggle} /> <Content
            style={{
              margin: '10px',
              padding: '10px',
              background: '#fff',
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter (MenuItem);
