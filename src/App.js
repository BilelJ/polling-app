import React, { Component } from 'react';
import Layout from './Components/Layout';
import Home from './Components/Home';
import Polls from './Containers/Polls';
import Poll from './Containers/Poll';
import NewPoll from './Containers/NewPoll';
import './App.css';
import {Switch, Route,BrowserRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/mypoll">
        <div>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/new" component={NewPoll} />
              <Route exact path="/polls" component={Polls} />
              <Route exact path="/polls/:id" component={Poll} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
