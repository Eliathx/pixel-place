import { BrowserRouter, Routes, Route } from 'react-router';
import { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Contact from './pages/Contact';
import About from './pages/About';
import Game from './pages/Game';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';


const App = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch('http://localhost:8000/getUser.php', {
            credentials: 'include' 
        })
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                setData(data);
            } else {
                if (window.location.pathname === '/play' || window.location.pathname === '/profile') {
                    window.location.href = '/login';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing username={data.username} />} />
                    <Route path="/contact" element={<Contact username={data.username} />} />
                    <Route path="/about" element={<About username={data.username} />} />
                    <Route path="/play" element={<Game username={data.username} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile profileData={data} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;