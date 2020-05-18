import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import FlowerList from './views/FlowerList';
import AddFlower from "./views/CreateFlower";
import UpdateFlower from "./views/UpdateFlower";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import BottomBar from './components/layout/BottomBar';
import HomeView from './views/Home';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <Router>
        <Switch>
          <Route path="/add-flower">
            <AddFlower/>
          </Route>
          <Route path="/update-flower/:flowerId">
            <UpdateFlower/>
          </Route>
          <Route path="/flower-list">
            <FlowerList />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
        <BottomBar/>
      </Router>
    </div>
  </ApolloProvider>
);
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
