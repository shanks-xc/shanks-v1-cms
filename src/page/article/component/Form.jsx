import React, {PureComponent} from 'react';
import {
  Form,
  Select,
  Switch,
  Input,
  Radio,
  Button,
  Upload,
  Icon,
  Modal,
} from 'antd';
import {uploadPic} from '../../../../src/utils/index';
import BraftEditor from 'braft-editor';
import {ContentUtils} from 'braft-utils';
//import {ImageUtils} from 'braft-finder';
import 'braft-editor/dist/index.css';
const FormItem = Form.Item;
class ProdFormItem extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      text: '',
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
      modules: {
        toolbar: {
          container: [
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            [
              'bold',
              'italic',
              'underline',
              'strike',
              'blockquote',
              'code-block',
            ],
            [
              {list: 'ordered'},
              {list: 'bullet'},
              {indent: '-1'},
              {indent: '+1'},
            ],
            ['link', 'image'],
            [{color: []}, {background: []}],
            ['clean'],
          ],
          handlers: {
            image: this.imageHandler,
          },
        },
        imageDrop: true,
      },
      editorState: BraftEditor.createEditorState (null),
    };
    // 改变this指向
    this.uploadHandle = this.uploadHandle.bind (this);
    this.handleEditChange = this.handleEditChange.bind (this);
  }
  // 富文本值改变方法
  handleEditChange (editorState) {
    this.setState ({editorState}); //输出editorState.toHTML ()文本
  }
  // 富文本上传
  uploadEditHandle = ({fileList, file}) => {
    if (file.status === 'done') {
      this.setState ({
        editorState: ContentUtils.insertMedias (this.state.editorState, [
          {
            type: 'IMAGE',
            url: fileList[fileList.length - 1].response.data.fileUrl,
          },
        ]),
      });
      this.props.form.setFieldsValue ({content: this.state.editorState});
    }
  };
  // 提交表单
  handleSubmit = e => {
    e.preventDefault ();
    this.props.form.validateFields ((err, values) => {
      if (!err) {
        console.log ('Received values of form: ', values);
      }
    });
  };
  uploadHandle = ({fileList, file}) => {
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
  // 获取字符窜的img标签
  findImg (str) {
    var imgReg = /<img.*?(?:>|\/>)/gi;
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = str.match (imgReg);
    if (arr === null) return;
    for (let i = 0; i < arr.length; i++) {
      var src = arr[i].match (srcReg);
      console.log (src[1].indexOf ('data'), src);
      if (src[1].indexOf ('data') > -1) {
        // 进行请求
        uploadPic (src[1]).then (res => {
          let text = str.replace (
            /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
            `<img data-index="xx" src ='${res}'>`
          );
          console.log (text, res);
          this.setState ({text});
        });
      }
      //获取图片地址
      console.log ('图片地址' + (i + 1) + '：' + src[1]);
    }
    return arr;
  }
  getIcons () {
    var icons = [
      'source | undo redo | bold italic underline strikethrough fontborder emphasis | ',
      'paragraph fontfamily fontsize | superscript subscript | ',
      'forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ',
      'cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ',
      'horizontal date time  | image emotion spechars | inserttable',
    ];
    return icons;
  }
  getPlugins () {
    return {
      image: {
        uploader: {
          name: 'file',
          url: '/api/upload',
        },
      },
    };
  }
  render () {
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            data={{
              fileType: `image`,
              userId: `88888888@139.com`,
            }}
            action="http://112.35.32.73:40111/api/attachment/uploadFile"
            accept="image/*"
            showUploadList={false}
            onChange={this.uploadEditHandle.bind (this)}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              <Icon type="picture" theme="filled" />
            </button>
          </Upload>
        ),
      },
    ];
    var icons = this.getIcons ();
    var plugins = this.getPlugins ();
    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
    ];
    const {previewVisible, previewImage, fileList = []} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {getFieldDecorator, getFieldsValue} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 19},
    };
    const controls = [
      'undo',
      'redo',
      'separator',
      'font-size',
      'line-height',
      'letter-spacing',
      'separator',
      'text-color',
      'bold',
      'italic',
      'underline',
      'strike-through',
      'separator',
      'superscript',
      'subscript',
      'remove-styles',
      'emoji',
      'separator',
      'text-indent',
      'text-align',
      'separator',
      'headings',
      'list-ul',
      'list-ol',
      'separator',
      'link',
      'separator',
      'clear',
    ];
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
                  message: '请上传图片!',
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
                  onChange={this.uploadHandle.bind (this)}
                >
                  {fileList.length >= 5 ? null : uploadButton}
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
        <FormItem {...formItemLayout} label="状态">
          {getFieldDecorator ('switch', {valuePropName: 'checked'}) (
            <Switch />
          )}
        </FormItem>
        {/* <ReactQuill
          modules={this.state.modules}
          value={this.state.text}
          formats={formats}
          onChange={this.handleEditChange}
        /> */}
        {/* <Editor
          ref="editor"
          icons={icons}
          value={this.state.text}
          defaultValue="<p>React Umeditor</p>"
          onChange={this.handleEditChange}
          plugins={plugins}
        /> */}
        <FormItem {...formItemLayout} label="文章正文">
          {getFieldDecorator ('content', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                validator: (_, value, callback) => {
                  if (value.isEmpty ()) {
                    callback ('请输入正文内容');
                  } else {
                    callback ();
                  }
                },
              },
            ],
          }) (
            <BraftEditor
              style={{border: '1px solid #d1d1d1', borderRadius: '5px'}}
              //value={this.state.editorState}
              onChange={this.handleEditChange}
              controls={controls}
              extendControls={extendControls}
            />
          )}
        </FormItem>
        <FormItem wrapperCol={{span: 12, offset: 6}}>
          <Button type="primary" htmlType="submit">修改</Button>
        </FormItem>
        {this.state.text}
      </Form>
    );
  }
}

const ProdItem = Form.create () (ProdFormItem);

export default ProdItem;
