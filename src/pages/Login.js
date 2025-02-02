import '../styles/Login.css';

const Login = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
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
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='middleScreenContainer' style={{overflowY:'hidden'}}>
            <main id='loginContainer'>
                <img src='loginImage.webp' alt='logo' id='loginLogo'/>
                <div id='loginFormContainer'>
                    <div id='loginTitleContainer'>
                        <h1 className='bigTitle'>Welcome back</h1>
                        <p>Don't have an account? <a href='/signup'><span style={{color:'blue', textDecoration: 'underline'}}>Sign up</span></a></p>
                    </div>
                    <form id='loginForm' onSubmit={()=>handleSubmit}>
                        <div id='inputDataContainer'>
                            <input name='username' className='inputData' placeholder='Username' required/>
                            <input type='password' name='password' className='inputData' placeholder='Enter your password' required/>
                        </div>
                        <button className='submitButton' >Log in</button>
                    </form>
                </div>
            </main>
            <img src='redYellowDecor.svg' alt='redYellowDecor' className='bgDecor' 
            style={{top: '-227px', left: '-280px',}}/>
            <img src='purpleGreenDecor.svg' alt='purpleGreenDecor' className='bgDecor'
            style={{top: '173px', right: '-318px',}}/>
        </div>
    );
};

export default Login;
