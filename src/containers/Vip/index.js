import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './style.css';

import axios from 'axios';

class Vip extends Component{

  constructor(props) {
    super(props);
    this.state = {
      login: true,
      fetchFinsh: false
    }
  }

  render() {
    const { login, fetchFinsh } = this.state;
    
    if (login) {
      if (fetchFinsh) {
        return <div className="vip-content">VIP</div>
      } else {
        return <div className="vip-content">正在判断用户的登陆状态...</div>
      }
    } else {
      return <Redirect to="/" />
    }

  }
  


  componentDidMount() {
    axios.get('http://www.dell-lee.com/react/api/isLogin.json', {
      withCredentials: true
    })
      .then(res => {
        const login = res.data.data.login;
        this.setState({
          login,
          fetchFinsh:true
        })
      })
  }


}

export default Vip;