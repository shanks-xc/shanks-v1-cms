import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
class BreadNav extends Component {
  render () {
    return (
      <Breadcrumb>
        {this.props.breadNav.map ((item, i) => (
          <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
}

export default BreadNav;
