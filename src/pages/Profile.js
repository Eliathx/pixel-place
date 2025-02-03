import { useState } from 'react';
import { useNavigate } from 'react-router'; 
import FooterNavigationBar from "../components/FooterNavigationBar";

const Profile = ({ profileData }) => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const navigate = useNavigate();  // Usamos useNavigate para redirigir

    const handleLogout = () => {
        fetch('http://localhost:8000/logout.php', {
            credentials: 'include',
        })
        .then(response => {
            if (response.ok) {
                setIsLoggedOut(true);
                navigate('/login');
            } else {
                console.error('Error during logout');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
    };

    if (isLoggedOut) {
        return <p>You have been logged out. Redirecting...</p>;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>@{profileData.username}</h2>
            <p>Pixels placed: {profileData.pixelsPlaced}</p>
            <p>Creation date: {profileData.creationDate}</p>
            <p>Leaderboard position:</p>

            <button onClick={handleLogout}>Log out</button>

            <FooterNavigationBar />
        </div>
    );
};

export default Profile;
