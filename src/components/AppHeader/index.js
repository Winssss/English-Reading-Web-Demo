import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import logo from './img/logo.png';
import './style.css';

import { Menu, Icon } from 'antd';
import axios from 'axios';


class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  getMenuItems() {
    return this.state.list.map(item => {
      return (
        <Menu.Item key={item.id}>
          <Link to={`/${item.id}`}> 
            <Icon type={item.icon} />
              {item.title}
          </Link>
        </Menu.Item>
      );
    });
  }

  render() {
    return(
      <Fragment>
        <Link to="/">
          <img src={logo} alt="logo" className="app-header-logo"/>
        </Link>
        <Menu mode="horizontal" className="app-header-menu">
          {this.getMenuItems()}
        </Menu>
      </Fragment>
    );
  }

  componentDidMount() {
    axios.get('http://www.dell-lee.com/react/api/header.json')
      .then(res => {
        const list = res.data.data;
        this.setState({ list });
      })
  }
}

export default AppHeader;