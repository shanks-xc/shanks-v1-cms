import React, {PureComponent} from 'react';
import {Table, Button} from 'antd';
import {withRouter} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
class TableItem extends PureComponent {
  constructor (props) {
    super (props);
    this.state = {};
  }
  goEmitProDetail (row) {
    this.props.history.push (`/product/${row.id}?type=edit`);
  }
  goProDetail (row) {
    this.props.history.push (`/product/${row.id}?type=read`);
  }
  render () {
    const columns = [
      {
        title: '文章ID',
        dataIndex: 'id',
      },
      {
        title: '文章名称',
        className: 'column-money',
        dataIndex: 'money',
      },
      {
        title: '文章分类',
        dataIndex: 'name',
      },
      {
        title: '状态',
        dataIndex: 'address',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <span>
            <Button
              icon="search"
              size="small"
              style={{marginRight: '10px'}}
              onClick={this.goProDetail.bind (this, record)}
            >
              查看
            </Button>
            <Button
              onClick={this.goEmitProDetail.bind (this, record)}
              type="primary"
              icon="edit"
              size="small"
              style={{marginRight: '10px'}}
            >
              编辑
            </Button>
            <Button
              type="danger"
              icon="delete"
              size="small"
              style={{
                background: '#f04134',
                color: 'white',
                borderColor: '#f04134',
              }}
            >
              删除
            </Button>
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        id: '111',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
        createTime: '2018-1-13',
      },
      {
        key: '2',
        id: '222',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
        createTime: '2018-1-12',
      },
      {
        key: '3',
        id: '333',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
        createTime: '2018-1-11',
      },
    ];
    return <Table columns={columns} dataSource={data} bordered />;
  }
}

export default withRouter (TableItem);
