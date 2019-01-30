import React, {Component, Fragment} from 'react';
import {Layout, Menu, Dropdown, Icon} from 'antd';
import store from '../store';
import {changeAuthen} from '../page/login/store/actionCreators';
const {Header} = Layout;
class HeaderItem extends Component {
  constructor (props) {
    super (props);
    this.state = {
      collapsed: false,
    };
    this.clicktHandle = this.clickHandle.bind (this);
  }
  clickHandle (item, key, keyPath) {
    switch (item.key) {
      case 'logout':
        store.dispatch (changeAuthen (false));
        break;
      default:
        break;
    }
  }
  render () {
    /**
 * 下拉内容
*/
    const menu = (
      <Menu onClick={this.clickHandle}>
        <Menu.Item key="0">
          修改密码
        </Menu.Item>
        <Menu.Item key="logout">
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Fragment>
        <Header style={{background: '#fff', padding: 0, padding: '0 16px'}}>
          <Icon
            className="trigger pointer"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.toggle}
          />
          <Dropdown overlay={menu} trigger={['click']}>
            <span style={{float: 'right', cursor: 'pointer'}}>
              <img
                style={{
                  width: '30px',
                  height: '30px',
                  borderRedius: '50%',
                  marginRight: '8px',
                }}
                src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=3c370711ff1fbe090853cb460a096756/e850352ac65c103814bff6a5bf119313b17e8997.jpg"
                alt=""
              />
              shanks
              <Icon type="down" />
            </span>

          </Dropdown>
        </Header>
      </Fragment>
    );
  }
}

export default HeaderItem;
