import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import createHistory from 'history/createBrowserHistory';
import {withRouter} from 'react-router-dom';
import './style.css';
import {changeAuthen} from './store/actionCreators';
import store from '../../store';
import axios from 'axios';
const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault ();
    this.props.form.validateFields (async (err, values) => {
      if (!err) {
        let res = await axios.post ('/user/signin', {
          username: this.props.form.getFieldValue ('username'),
          password: this.props.form.getFieldValue ('password'),
        });
        console.log (res);
        if (res.data.code === 200) {
          store.dispatch (changeAuthen (true));
          this.props.history.push ('/');
        } else {
          alert (
            '注册接口:http://localhost:8888/user/signup,参数分别是:nickname,username,password'
          );
        }
      }
    });
  };
  render () {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator ('username', {
            rules: [{required: true, message: 'Please input your username!'}],
          }) (
            <Input
              prefix={<Icon type="user" style={{fontSize: 13}} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator ('password', {
            rules: [{required: true, message: 'Please input your Password!'}],
          }) (
            <Input
              prefix={<Icon type="lock" style={{fontSize: 13}} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator ('remember', {
            valuePropName: 'checked',
            initialValue: true,
          }) (<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot">Forgot password</a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a>register now!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create () (Login);

export default withRouter (WrappedNormalLoginForm);
