import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const title = '여기에 App 컴포넌트를 렌더링하세요';
console.log(App);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);