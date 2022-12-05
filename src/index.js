
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from './root';
import  store  from './Redux/store';


import { Provider } from 'react-redux';


ReactDOM.render(
  <div>
    <Provider store={store}>
    <BrowserRouter>
       <Root store={store} />
      </BrowserRouter>
    </Provider>
  </div>,

  document.getElementById('root')
)


