import ReactDOM from 'react-dom/client';
import "./styles/index.css"
import { BrowserRouter, Routes, Route } from 'react-router';
import Landing from './pages/Landing';
import Contact from './pages/Contact';
import About from './pages/About';
import Game from './pages/Game';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/play" element={<Game />} />

      {/* TODO: Add missing paths
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> */}
      
    </Routes>
  </BrowserRouter>
);