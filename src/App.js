import { BrowserRouter, Routes, Route } from 'react-router';
import { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Contact from './pages/Contact';
import About from './pages/About';
import Game from './pages/Game';
import Login from './pages/Login';
import Signup from './pages/Signup';

const  App = () => {
   const [username, setUsername] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/getUser.php', {
            credentials: 'include' 
        })
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                setUsername(data.username);
            } else {
                window.location.href = '/login';
            }
        });
   }, []);

  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Landing  />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/about" element={<About  />} />
            <Route path="/play" element={<Game username={username}  />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            </Routes>
         </BrowserRouter>
    </div>
  );
};

export default App;