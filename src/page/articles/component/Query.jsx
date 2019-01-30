import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {Input, Icon, Row, Col, DatePicker, Button} from 'antd';
const {MonthPicker, RangePicker} = DatePicker;
class Query extends PureComponent {
  render () {
    return (
      <div class="m-top-20">
        <Row gutter={10}>
          <Col span={7}>
            <Input addonBefore="产品名称" defaultValue="mysite" />
          </Col>
          <Col span={7}>
            <Input addonBefore="产品ID" defaultValue="mysite" />
          </Col>
          <Col span={7}>
            <RangePicker />
          </Col>
          <Col span={3} className="text-center">
            <Button type="primary">查询</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Query;
