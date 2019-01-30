import React, {Component, Fragment} from 'react';
import BreadNav from '../../component/BreadNav';
import Query from './component/Query';
import Table from './component/Table';
class PageIndex extends Component {
  state = {
    collapsed: false,
    breadNav: ['首页', '文章列表'],
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
        <Query />
        <div className="space m-top-20" />
        <Table />
      </Fragment>
    );
  }
}

export default PageIndex;
