import React, {Component, Fragment} from 'react';
import BreadNav from '../../component/BreadNav';
import Form from './component/articleForm';
class PageIndex extends Component {
  state = {
    collapsed: false,
    breadNav: ['首页', '新增文章'],
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
