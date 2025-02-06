import { useState } from 'react';
import { useNavigate } from 'react-router'; 
import FooterNavigationBar from "../components/FooterNavigationBar";
import HeaderNavigationBar from '../components/HeaderNavigationBar';
import '../styles/Profile.css';

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

    const formattedDate = new Date(profileData.creationdate).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

    if (isLoggedOut) {
        return <p>You have been logged out. Redirecting...</p>;
    }

    return (
        <div>
            <HeaderNavigationBar username={profileData.username} isProfile={true} />
            <section className='profileSection'>
                <h2><strong>@{profileData.username}</strong></h2>
                <p><strong>Pixels placed:</strong> {profileData.pixelsplaced}</p>
                <p><strong>Creation date:</strong> {formattedDate}</p>
                <p><strong>Leaderboard position </strong> #{profileData.leaderboardPosition}</p>
            </section>
            <section className='logoutSection'>
                <a className='returnLink' href='/play'>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 3.83334L6.5 8.50001L10.5 13.1667" stroke="var(--gray)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Return to canvas
                </a>
                <button className='logoutLink' onClick={handleLogout}>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.33333 14.5C2.96667 14.5 2.65289 14.3696 2.392 14.1087C2.13111 13.8478 2.00044 13.5338 2 13.1667V3.83333C2 3.46667 2.13067 3.15289 2.392 2.892C2.65333 2.63111 2.96711 2.50044 3.33333 2.5H7.33333C7.52222 2.5 7.68067 2.564 7.80867 2.692C7.93667 2.82 8.00044 2.97822 8 3.16667C7.99956 3.35511 7.93556 3.51356 7.808 3.642C7.68044 3.77044 7.52222 3.83422 7.33333 3.83333H3.33333V13.1667H7.33333C7.52222 13.1667 7.68067 13.2307 7.80867 13.3587C7.93667 13.4867 8.00044 13.6449 8 13.8333C7.99956 14.0218 7.93556 14.1802 7.808 14.3087C7.68044 14.4371 7.52222 14.5009 7.33333 14.5H3.33333ZM11.45 9.16667H6.66667C6.47778 9.16667 6.31956 9.10267 6.192 8.97467C6.06444 8.84667 6.00044 8.68844 6 8.5C5.99956 8.31156 6.06356 8.15333 6.192 8.02533C6.32044 7.89733 6.47867 7.83333 6.66667 7.83333H11.45L10.2 6.58333C10.0778 6.46111 10.0167 6.31111 10.0167 6.13333C10.0167 5.95556 10.0778 5.8 10.2 5.66667C10.3222 5.53333 10.4778 5.46378 10.6667 5.458C10.8556 5.45222 11.0167 5.51622 11.15 5.65L13.5333 8.03333C13.6667 8.16667 13.7333 8.32222 13.7333 8.5C13.7333 8.67778 13.6667 8.83333 13.5333 8.96667L11.15 11.35C11.0167 11.4833 10.8584 11.5473 10.6753 11.542C10.4922 11.5367 10.3338 11.4671 10.2 11.3333C10.0778 11.2 10.0196 11.0418 10.0253 10.8587C10.0311 10.6756 10.0949 10.5227 10.2167 10.4L11.45 9.16667Z" 
                        fill="var(--black)"/>
                    </svg>
                    Log out
                </button>
            </section>

            <FooterNavigationBar />
            <img src='redYellowDecor.svg' alt='redYellowDecor' className='bgDecor' 
            style={{top: '-227px', left: '-280px',}}/>
            <img src='purpleGreenDecor.svg' alt='purpleGreenDecor' className='bgDecor'
            // style={{top: '173px', right: '-318px',}}/>
            style={{top: '-260px', right: '-378px',}}/>
        </div>
    );
};

export default Profile;
