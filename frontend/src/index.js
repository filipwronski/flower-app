import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import FlowerList from './components/FlowerList';
import AddFlower from "./components/CreateFlower";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navigation from './components/Navigation'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>Flower APP</h2>
      <Router>
        <Navigation/>
        <div>
          <Switch>
            <Route path="/add-flower">
              <AddFlower/>
            </Route>
            <Route path="/">
              <FlowerList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  </ApolloProvider>
);
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
