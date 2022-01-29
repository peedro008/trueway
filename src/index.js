import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from './root';
import  store  from './redux/store';


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


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

