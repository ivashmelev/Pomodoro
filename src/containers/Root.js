import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import history from '../helpers/history'
import App from './App';


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
        <Route exact path='/' render={() => wrap(App)} />
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
