import React from 'react';
import './styles/App.css';
import Header from './components/navbar/header.js';
import './styles/header.css';
import Hero from './hero.js'
import './styles/hero.css';
import AofM from './artist-of-mount.js';
import './styles/artist-of-mount.css';
import Reviews from './reviews.js';
import './styles/reviews.css';
import Home from './pages/Home.jsx';
import History from "./pages/History.jsx"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";




function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                    path="/History"
                    element={<History />}
                />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
