import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

import axios from 'axios';
import { List } from 'antd';


class ContentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[]
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let id = nextProps.match.params.id;
    let url = 'http://www.dell-lee.com/react/api/list.json'
    if (id) {
      url += `?id=${id}`
    }
    axios.get(url)
      .then(res => {
        const list = res.data.data;
        this.setState({ list });
      });
  }

  // 渲染列表内容
  getList(){
    return (
      <List
        className="content-list-item"
        bordered
        dataSource={this.state.list}
        renderItem={item => 
          <List.Item>
            <Link to={`/detail/${item.id}`}>{item.title}</Link>
          </List.Item>}
      />
    );
  }

  render() {
    return(
      <Fragment>
        {this.getList()}
      </Fragment>
    );
  }

  componentDidMount() {
    axios.get('http://www.dell-lee.com/react/api/list.json')
      .then(res => {
        const list = res.data.data;
        this.setState({ list });
      });
  }
}

export default ContentList;