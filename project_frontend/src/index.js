import React from 'react';
import DocumentMeta from 'react-document-meta';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const meta = {
  title: 'React & Rails',
  description: 'This is a task',
  canonical: 'http://example.com/path/to/page',
  meta: {
      charset: 'utf-8',
      name: "csrf-token",
      content: "*"
  }
};


ReactDOM.render(
      <DocumentMeta {...meta}>
          <App />
      </DocumentMeta>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
