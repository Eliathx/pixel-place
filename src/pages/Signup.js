import '../styles/Signup.css';

const Signup = () => {
    return (
        <div className='middleScreenContainer' style={{overflowY:'hidden'}}>
            <main id='signupContainer'>
                <div id='signupImageContainer'>
                    <img src='signupImage.webp' alt='logo'/>
                    <a href='/' id='returnButton'>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 3.83334L6.5 8.50001L10.5 13.1667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p>Back to website</p>
                    </a>
                </div>
                <div id='signupFormContainer'>
                    <div id='signupTitleContainer'>
                        <h1 className='bigTitle'>Create an account</h1>
                        <p>Already have an account? <a href='/login'><span style={{color:'blue', textDecoration: 'underline'}}>Log in</span></a></p>
                    </div>
                    <form id='signupForm'>
                        <div id='inputDataContainer'>
                            <input name='username' className='inputData' placeholder='Username' required/>
                            <input name='password' className='inputData' placeholder='Enter your password' required/>
                            <input name='passwordConfirmation' className='inputData' placeholder='Re-enter your password' required/>
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

export default Signup;
