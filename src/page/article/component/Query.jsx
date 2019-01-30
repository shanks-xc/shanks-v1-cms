import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {Input, Icon, Row, Col, DatePicker, Button, Select} from 'antd';
const {MonthPicker, RangePicker} = DatePicker;
const Option = Select.Option;
class Query extends PureComponent {
  render () {
    return (
      <div class="m-top-20">
        <Row gutter={10} style={{lineHeight: '32px'}}>
          <Col span={7}>
            <Col span={6}>
              文章分类
            </Col>
            <Col span={18}>
              <Select defaultValue="lucy" style={{width: '100%'}}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
          </Col>
          <Col span={7}>
            <Input addonBefore="文章标题" defaultValue="mysite" />
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
