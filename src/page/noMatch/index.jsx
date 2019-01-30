import React, {Component} from 'react';
class Login extends Component {
  state = {
    collapsed: false,
    breadNav: ['首页'],
  };
  toggle = () => {
    this.setState ({
      collapsed: !this.state.collapsed,
    });
  };
  render () {
    return (
      <div>
        <img src={require ('../../static/images/404.jpg')} alt="" />
      </div>
    );
  }
}

export default Login;
