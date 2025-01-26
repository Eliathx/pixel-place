import '../styles/Login.css';

const Login = () => {
    return (
        <div className='middleScreenContainer' style={{overflowY:'hidden'}}>
            <main id='loginContainer'>
                <img src='loginImage.webp' alt='logo' id='loginLogo'/>
                <div id='loginFormContainer'>
                    <div id='loginTitleContainer'>
                        <h1 className='bigTitle'>Welcome back</h1>
                        <p>Don't have an account? <a href='/signup'><span style={{color:'blue', textDecoration: 'underline'}}>Sign up</span></a></p>
                    </div>
                    <form id='loginForm'>
                        <div id='inputDataContainer'>
                            <input name='username' className='inputData' placeholder='Username' required/>
                            <input name='password' className='inputData' placeholder='Enter your password' required/>
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
