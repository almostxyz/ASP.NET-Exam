import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { StudentList } from './components/StudentList'
import { About } from './components/About'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={StudentList} />
        <Route path='/about' component={About} />
      </Layout>
    );
  }
}
