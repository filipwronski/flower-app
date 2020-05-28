import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import FlowerList from './views/FlowerList';
import AddFlower from "./views/CreateFlower";
import UpdateFlower from "./views/UpdateFlower";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomeView from './views/Home';


const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: "https://192.168.0.73:4000/graphql",
        credentials: 'include',
    }),
});

function App () {
    return (
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
                    <FlowerList/>
                </Route>
                <Route path="/">
                    <HomeView/>
                </Route>
                </Switch>
            </Router>
            </div>
        </ApolloProvider>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
