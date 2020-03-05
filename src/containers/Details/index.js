import React, { Component } from 'react';

import './style.css';

import { Card } from 'antd';
import axios from 'axios';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[]
    }
  }

  render() {
    return(
      <Card
        className="detail-content"  
        title={this.state.list.title}
      >
        <div dangerouslySetInnerHTML={{__html: this.state.list.content}}></div>
      </Card>
    );
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id)
    axios.get('http://www.dell-lee.com/react/api/detail.json?id='+id)
      .then(res => {
        const list = res.data.data;
        this.setState({ list })
      });
  }

}

export default Detail;