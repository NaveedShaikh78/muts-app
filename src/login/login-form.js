import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
class NormalLoginForm extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.cuid = '';
        this.props.login(window.HTTPService, window.application, values)
          .then(res => {
            if (!res) {
              this.setState({ showerror: true });
            }
          });
      }
    });
  }
  state = {
    showerror: false
  }
  render = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(

            <Checkbox>Remember me</Checkbox>
          )}
          <Button key="back" htmlType="submit"
            icon="login"
            type="primary"
            ghost>Login
          </Button>
          {this.state.showerror ?
            <p style={{ color: 'red' }}> Login failed </p>
            : null}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm)