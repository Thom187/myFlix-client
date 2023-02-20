import React from 'react';
import ReactDOMClient from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss``
import './components/main-view/main-view.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView /> {/* shorthand for <MainView></MainView> */}
        </Container>
      </Provider>
    );
  }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Creates a root
const root = ReactDOMClient.createRoot(container);

// Tells React to render the app in the root DOM element
root.render(React.createElement(MyFlixApplication));

