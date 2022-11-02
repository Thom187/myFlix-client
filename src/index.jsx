import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss``
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <MainView /> // shorthand for <MainView></MainView>
    );
  }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Creates a root
const root = ReactDOMClient.createRoot(container);

// Tells React to render the app in the root DOM element
root.render(React.createElement(MyFlixApplication));


