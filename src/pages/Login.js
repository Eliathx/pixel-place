import { useState } from "react";
import '../styles/Login.css';

const Login = () => {
    const [statusMessage, setStatusMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('');
        const formData = new FormData(e.target);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('http://localhost:8000/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include' 
            });
            const result = await response.json();
            if (result.success) {
                window.location.href = '/play';
            } else {
                setStatusMessage(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='middleScreenContainer' style={{overflowY:'hidden'}}>
            <main id='loginContainer'>
                <div id='loginImageContainer'>
                    <img src='loginImage.webp' alt='logo'/>
                    <a href='/' id='returnButton'>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 3.83334L6.5 8.50001L10.5 13.1667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p>Back to website</p>
                    </a>
                </div>
                <div id='loginFormContainer'>
                    <div id='loginTitleContainer'>
                        <h1 className='bigTitle'>Welcome back</h1>
                        <p>Don't have an account? <a href='/signup'><span style={{color:'blue', textDecoration: 'underline'}}>Sign up</span></a></p>
                    </div>
                    <form id='loginForm' onSubmit={handleSubmit}>
                        <div id='inputDataContainer'>
                            <input name='username' className='inputData' placeholder='Username' required/>
                            <input name='password' type='password' className='inputData' placeholder='Enter your password' required/>
                        </div>
                        <div className='submitArea'>
                            {statusMessage && <p style={{color:'var(--darkGreen)'}}>{statusMessage}</p>}
                            <button className='submitButton' >Log in</button>
                        </div>
                    </form>
                </div>
            </main>
            <img src='redYellowDecor.svg' alt='redYellowDecor' className='bgDecor' 
            style={{top: '-227px', left: '-280px',}}/>
            <img src='purpleGreenDecor.svg' alt='purpleGreenDecor' className='bgDecor'
            // style={{top: '173px', right: '-318px',}}/>
            style={{top: '-160px', right: '-378px',}}/>
        </div>
    );
};

export default Login;
