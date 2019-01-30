import React, {Component} from 'react';
import BreadNav from '../../component/BreadNav';
class PageIndex extends Component {
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
    return <BreadNav breadNav={this.state.breadNav} />;
  }
}

export default PageIndex;
