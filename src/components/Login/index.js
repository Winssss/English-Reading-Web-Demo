import React, { Component, Fragment } from 'react';

import './style.css';

import {Button, Modal, Input, message } from 'antd';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.userChange = this.userChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.logOut = this.logOut.bind(this);
    
    this.state = {
      login: false,
      visible:false,
      usr: '',
      password: ''
    }
  }

  // 显示登陆按钮
  showLoginBtn() {
    const { login } = this.state;
    return (
      login ? 
        <Button 
          type="primary" 
          className="content-list-login-btn"
          onClick={this.logOut}
        >
          退出
        </Button> : 
        <Button 
          type="primary" 
          className="content-list-login-btn"
          onClick={this.showModal}
        >
          登陆
        </Button>
    );
  }

  showVipBtn() {
    return (
      <Link to="/vip">
        <Button 
          type="primary" 
          className="content-list-vip-btn"
        >
          VIP
        </Button>
      </Link>
    );
  }

  // 点击登陆按钮显示登录框
  showModal() {
    this.setState({
      visible: true
    });
  }

  // 隐藏登陆框
  handleCancel() {
    this.setState({
      visible:false
    });
  }

  // 获取用户名输入框里的值，更新this.state.user
  userChange(e) {
    const user = e.target.value;
    this.setState({ user });
  }

  // 获取密码输入框里的值，更新this.state.password
  passwordChange(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  // 向页面渲染一个登录框
  modalItem() {
    return (
      <Modal
        title="登陆"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Input 
          className="content-list-modal-input"
          placeholder="请输入用户名"
          value={this.state.user}
          onChange={this.userChange}
        />
        <Input
          placeholder="请输入密码" 
          type="password"
          value={this.state.password}
          onChange={this.passwordChange}
        />
      </Modal>
    );
  }
  

  // 验证用户名和密码
  handleOk() {
    const { user, password } = this.state;
    let url = `http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`
    axios.get(url, {
      withCredentials: true
    }).then(res => {
      let login = res.data.data.login;
      if (login) {
        message.success("登陆成功")
        this.setState({ login, visible:false })
      } else {
        message.error("登陆失败")
      }
    })
  }


  // 点击退出按钮时，退出登陆状态
  logOut() {
    axios.get('http://www.dell-lee.com/react/api/logout.json', {
      withCredentials: true
    })
      .then(() => {
        this.setState({login: false})
        this.props.history.push("/")
      });
  }

  render() {
    return(
      <Fragment>
        {this.showLoginBtn()}
        {this.showVipBtn()}
        {this.modalItem()}
      </Fragment>
    );
  }

  componentDidMount() {
    axios.get('http://www.dell-lee.com/react/api/isLogin.json', {
      withCredentials: true
    })
      .then(res => {
        const login = res.data.data.login;
        this.setState({ login });
      });
  }

}

export default withRouter(Login);