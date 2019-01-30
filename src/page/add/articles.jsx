import React, {Component, Fragment} from 'react';
import BreadNav from '../../component/BreadNav';
import Form from './component/articlesForm';
class PageIndex extends Component {
  state = {
    collapsed: false,
    breadNav: ['首页', '新增文章分类'],
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
        {/* <Query />
        <div className="space m-top-20" />
        <Table /> */}
        <Form />
      </Fragment>
    );
  }
}

export default PageIndex;
