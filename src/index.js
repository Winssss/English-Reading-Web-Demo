import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './style.css';
import AppHeader from './components/AppHeader';
import Login from './components/Login';
import ContentList from './containers/Contents';
import Detail from './containers/Details'
import Vip from './containers/Vip';

import 'antd/dist/antd.css';
import { Layout } from 'antd';


const { Header, Footer, Content } = Layout;

class App extends Component {

  render() {
    return(
      <BrowserRouter>
        <Layout className="container">
          <Header className="header">
            <AppHeader />
          </Header>
          <Content className="content">
            <Login />
            <Switch>
              <Route path="/vip" component={Vip} />
              <Route path="/detail/:id" component={Detail}/>
              <Route path="/:id?" component={ContentList}/>
            </Switch>
          </Content>
          <Footer className="footer">@Copyright Aaron Huang 2020</Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));