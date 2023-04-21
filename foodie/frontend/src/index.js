import React from 'react';
// import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'; // for react 18
import 'bootstrap/dist/css/bootstrap.min.css'; // for bootstrap 
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = createRoot(document.getElementById("root")); // for react 18
root.render(<App />);