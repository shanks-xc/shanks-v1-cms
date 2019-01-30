import React, {PureComponent} from 'react';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Input,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Modal,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ProdFormItem extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
    uploadList: [],
  };
  handleSubmit = e => {
    e.preventDefault ();
    console.log (this.props.form.getFieldsValue ());
    this.props.form.validateFields ((err, values) => {
      if (!err) {
        console.log ('Received values of form: ', values);
      }
    });
  };
  handleChange = ({fileList, file}) => {
    this.setState ({fileList});
    if (file.status === 'done') {
      let fileObj = [];
      this.state.fileList.forEach ((item, index) => {
        if (item.response) {
          fileObj.push (item.response.data.fileUrl);
        } else {
          fileObj.push (item.url);
        }
      });
      this.setState ({uploadList: fileObj});
      this.props.form.setFieldsValue ({uploadPic: this.state.uploadList});
    }
  };
  normFile = e => {
    console.log ('Upload event:', e);
    if (Array.isArray (e)) {
      return e;
    }
    return e && e.fileList;
  };
  render () {
    const {previewVisible, previewImage, fileList = []} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {getFieldDecorator, getFieldsValue} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    return (
      <Form onSubmit={this.handleSubmit.bind (this)}>
        {/* 标题 */}
        <FormItem {...formItemLayout} label="标题" hasFeedback>
          {getFieldDecorator ('title-input', {
            rules: [{required: true, message: '请输入标题!'}],
          }) (<Input />)}
        </FormItem>
        {/* 主图 */}
        <FormItem {...formItemLayout} label="主图">
          <div className="dropbox">
            {getFieldDecorator ('uploadPic', {
              getValueFromEvent: this.normFile,
              rules: [
                {
                  validator: function (rule, value, callback) {
                    console.log (getFieldsValue ());
                    console.log (fileList, fileList.length > 0);
                    if (fileList.length < 0) {
                      callback ('请上传图片');
                    } else {
                      callback ();
                    }
                  },
                },
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
              ],
            }) (
              <div>
                <Upload
                  action="http://112.35.32.73:40111/api/attachment/uploadFile"
                  listType="picture-card"
                  fileList={fileList}
                  data={{
                    fileType: `image`,
                    userId: `88888888@139.com`,
                  }}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange.bind (this)}
                >
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img
                    alt="example"
                    style={{width: '100%'}}
                    src={previewImage}
                  />
                </Modal>
              </div>
            )}
          </div>
        </FormItem>
        <FormItem {...formItemLayout} label="描述" hasFeedback>
          {getFieldDecorator ('select', {
            rules: [{required: true, message: '请填写相关描述!'}],
          }) (<Input type="textarea" autosize={{minRows: 2, maxRows: 6}} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否上架">
          {getFieldDecorator ('switch', {valuePropName: 'checked'}) (
            <Switch />
          )}
        </FormItem>
        <FormItem wrapperCol={{span: 12, offset: 6}}>
          <Button type="primary" htmlType="submit">修改</Button>
        </FormItem>
      </Form>
    );
  }
}

const ProdItem = Form.create () (ProdFormItem);

export default ProdItem;
