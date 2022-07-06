import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //StrictMode render the project twice (on dev but not production) in order to detect any problems with your code and warn you about them (which can be quite useful). Normalmente criado com create-react-app 
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <>
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
