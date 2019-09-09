import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import history from '../helpers/history'
import App from './App';
import CreateTask from './CreateTask'
import PageTasks from './PageTasks'


const wrap = Component => {
  return (
    <App>
      <Component />
    </App>
  )
}

const Routing = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' render={() => wrap(CreateTask)} />
        <Route exact path='/tasks' render={() => wrap(PageTasks)} />
      </Switch>
    </Router>
  )
}

export default class Root extends Component {
  render() {
    return (
      <Routing {...this.props} />
    )
  }
}
