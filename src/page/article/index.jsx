import React, {Component, Fragment} from 'react';
import BreadNav from '../../component/BreadNav';
import Form from './component/Form';
class PageIndex extends Component {
  state = {
    collapsed: false,
    breadNav: ['首页', '产品详情'],
  };
  toggle = () => {
    this.setState ({
      collapsed: !this.state.collapsed,
    });
  };
  render () {
    return (
      <Fragment>
        <BreadNav breadNav={this.state.breadNav} />
        <Form />
      </Fragment>
    );
  }
}

export default PageIndex;
