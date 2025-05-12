import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Components/Main';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/dashboard/*' element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;