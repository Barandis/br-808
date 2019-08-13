import 'normalize.css';
import './index.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from 'store';
import AppLayout from 'layouts/app';

const App = () => (
  <Provider store={store}>
    <div style={{ width: '100%', height: '100%' }}>
      <AppLayout />
    </div>
  </Provider>
);

function onMount() {
  document.getElementById('loader').className = 'done';
  document.getElementById('root').className = '';
}

render(<App />, document.getElementById('root'), onMount);
