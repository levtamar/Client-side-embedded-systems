// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // ייבוא של React Router
import App from './App';
import FixPage from './FixPage'; // יש ליצור את דף תיקון

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* הוספנו את ה- Router */}
      <Routes>
        <Route path="/" element={<App />} /> {/* דף ראשי */}
        <Route path="/fix" element={<FixPage />} /> {/* דף תיקון */}
      </Routes>
    </Router>
  </React.StrictMode>
);
