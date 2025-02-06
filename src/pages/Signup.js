import { useState } from "react";
import '../styles/Signup.css';

const Signup = () => {
    const [statusMessage, setStatusMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatusMessage("");

        const formData = new FormData(e.target);

        const password = formData.get('password');
        const passwordConfirmation = formData.get('passwordConfirmation');

        if (password !== passwordConfirmation) {
            setStatusMessage("Passwords do not match");
            return;
        }

        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('http://localhost:8000/signup.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            if (result.success) {
                setStatusMessage(response.message + "Redirecting to login page...");
                window.location.href = '/login';
            } else {
                setStatusMessage("Error: " + result.message);
                console.error('Error:', result.message);
            }
        } catch (error) {
            setStatusMessage("Error a: " + error);
        }
    };

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
                        <h1 className='bigTitle'>Create an <br></br> account</h1>
                        <p>Already have an account? <a href='/login'><span style={{color:'blue', textDecoration: 'underline'}}>Log in</span></a></p>
                    </div>
                    <form id='signupForm' onSubmit={handleSubmit}>
                        <div id='inputDContainer'>
                            <input name='username' id="" className='inputData' placeholder='Username' maxLength={50} required/>
                            <div className='inputDataContainerWithIcon' style={{paddingLeft:'0'}}>
                                <input name='password' type={showPassword ? "text" : "password"} id="passwordSignup" placeholder='Enter your password' maxLength={255} required/>
                                <svg onClick={() => setShowPassword(!showPassword)} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {showPassword ? <path d="M11 6.1875C12.6089 6.18215 14.1866 6.63094 15.5519 7.48226C16.9171 8.33359 18.0143 9.55289 18.7175 11C17.2737 13.9487 14.325 15.8125 11 15.8125C7.675 15.8125 4.72625 13.9487 3.2825 11C3.98567 9.55289 5.08293 8.33359 6.44814 7.48226C7.81336 6.63094 9.39111 6.18215 11 6.1875ZM11 4.4375C6.625 4.4375 2.88875 7.15875 1.375 11C2.88875 14.8412 6.625 17.5625 11 17.5625C15.375 17.5625 19.1112 14.8412 20.625 11C19.1112 7.15875 15.375 4.4375 11 4.4375ZM11 8.8125C11.5802 8.8125 12.1366 9.04297 12.5468 9.4532C12.957 9.86344 13.1875 10.4198 13.1875 11C13.1875 11.5802 12.957 12.1366 12.5468 12.5468C12.1366 12.957 11.5802 13.1875 11 13.1875C10.4198 13.1875 9.86344 12.957 9.4532 12.5468C9.04297 12.1366 8.8125 11.5802 8.8125 11C8.8125 10.4198 9.04297 9.86344 9.4532 9.4532C9.86344 9.04297 10.4198 8.8125 11 8.8125ZM11 7.0625C8.83 7.0625 7.0625 8.83 7.0625 11C7.0625 13.17 8.83 14.9375 11 14.9375C13.17 14.9375 14.9375 13.17 14.9375 11C14.9375 8.83 13.17 7.0625 11 7.0625Z" fill="#969696"/>
                                    : <path d="M1.83317 4.83082L3.0065 3.66666L18.3332 18.9933L17.169 20.1667L14.3457 17.3433C13.2915 17.6917 12.1732 17.875 10.9998 17.875C6.4165 17.875 2.50234 15.0242 0.916504 11C1.549 9.38666 2.55734 7.96582 3.84067 6.83832L1.83317 4.83082ZM10.9998 8.24999C11.7292 8.24999 12.4287 8.53972 12.9444 9.05545C13.4601 9.57117 13.7498 10.2706 13.7498 11C13.7503 11.3122 13.6976 11.6222 13.594 11.9167L10.0832 8.40582C10.3777 8.30222 10.6877 8.24953 10.9998 8.24999ZM10.9998 4.12499C15.5832 4.12499 19.4973 6.97582 21.0832 11C20.3346 12.9002 19.0634 14.5496 17.4165 15.7575L16.1148 14.4467C17.3825 13.5698 18.4049 12.3833 19.0848 11C18.3439 9.48737 17.1933 8.21299 15.7641 7.32173C14.3348 6.43048 12.6842 5.95811 10.9998 5.95832C10.0007 5.95832 9.01984 6.12332 8.10317 6.41666L6.6915 5.01416C8.0115 4.44582 9.469 4.12499 10.9998 4.12499ZM2.91484 11C3.65582 12.5126 4.80634 13.787 6.23559 14.6782C7.66484 15.5695 9.31547 16.0419 10.9998 16.0417C11.6323 16.0417 12.2557 15.9775 12.8332 15.8492L10.7432 13.75C10.1053 13.6816 9.51009 13.397 9.05648 12.9433C8.60287 12.4897 8.31821 11.8945 8.24984 11.2567L5.13317 8.13082C4.22567 8.90999 3.46484 9.88166 2.91484 11Z" fill="#969696"/>}
                                </svg>
                            </div>
                            <div className='inputDataContainerWithIcon' style={{paddingLeft:'0'}}>
                                <input name='passwordConfirmation' type={showConfirmPassword ? "text" : "password"} placeholder='Re-enter your password' required/>
                                <svg onClick={() => setShowConfirmPassword(!showConfirmPassword)} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {showConfirmPassword ? <path d="M11 6.1875C12.6089 6.18215 14.1866 6.63094 15.5519 7.48226C16.9171 8.33359 18.0143 9.55289 18.7175 11C17.2737 13.9487 14.325 15.8125 11 15.8125C7.675 15.8125 4.72625 13.9487 3.2825 11C3.98567 9.55289 5.08293 8.33359 6.44814 7.48226C7.81336 6.63094 9.39111 6.18215 11 6.1875ZM11 4.4375C6.625 4.4375 2.88875 7.15875 1.375 11C2.88875 14.8412 6.625 17.5625 11 17.5625C15.375 17.5625 19.1112 14.8412 20.625 11C19.1112 7.15875 15.375 4.4375 11 4.4375ZM11 8.8125C11.5802 8.8125 12.1366 9.04297 12.5468 9.4532C12.957 9.86344 13.1875 10.4198 13.1875 11C13.1875 11.5802 12.957 12.1366 12.5468 12.5468C12.1366 12.957 11.5802 13.1875 11 13.1875C10.4198 13.1875 9.86344 12.957 9.4532 12.5468C9.04297 12.1366 8.8125 11.5802 8.8125 11C8.8125 10.4198 9.04297 9.86344 9.4532 9.4532C9.86344 9.04297 10.4198 8.8125 11 8.8125ZM11 7.0625C8.83 7.0625 7.0625 8.83 7.0625 11C7.0625 13.17 8.83 14.9375 11 14.9375C13.17 14.9375 14.9375 13.17 14.9375 11C14.9375 8.83 13.17 7.0625 11 7.0625Z" fill="#969696"/>
                                    : <path d="M1.83317 4.83082L3.0065 3.66666L18.3332 18.9933L17.169 20.1667L14.3457 17.3433C13.2915 17.6917 12.1732 17.875 10.9998 17.875C6.4165 17.875 2.50234 15.0242 0.916504 11C1.549 9.38666 2.55734 7.96582 3.84067 6.83832L1.83317 4.83082ZM10.9998 8.24999C11.7292 8.24999 12.4287 8.53972 12.9444 9.05545C13.4601 9.57117 13.7498 10.2706 13.7498 11C13.7503 11.3122 13.6976 11.6222 13.594 11.9167L10.0832 8.40582C10.3777 8.30222 10.6877 8.24953 10.9998 8.24999ZM10.9998 4.12499C15.5832 4.12499 19.4973 6.97582 21.0832 11C20.3346 12.9002 19.0634 14.5496 17.4165 15.7575L16.1148 14.4467C17.3825 13.5698 18.4049 12.3833 19.0848 11C18.3439 9.48737 17.1933 8.21299 15.7641 7.32173C14.3348 6.43048 12.6842 5.95811 10.9998 5.95832C10.0007 5.95832 9.01984 6.12332 8.10317 6.41666L6.6915 5.01416C8.0115 4.44582 9.469 4.12499 10.9998 4.12499ZM2.91484 11C3.65582 12.5126 4.80634 13.787 6.23559 14.6782C7.66484 15.5695 9.31547 16.0419 10.9998 16.0417C11.6323 16.0417 12.2557 15.9775 12.8332 15.8492L10.7432 13.75C10.1053 13.6816 9.51009 13.397 9.05648 12.9433C8.60287 12.4897 8.31821 11.8945 8.24984 11.2567L5.13317 8.13082C4.22567 8.90999 3.46484 9.88166 2.91484 11Z" fill="#969696"/>}
                                </svg>
                            </div>
                        <div className='submitArea'>
                            {statusMessage && <p style={{color:'var(--darkGreen)'}}>{statusMessage}</p>}
                            <button className='submitButton'>Sign up</button>
                            </div>
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

export default Signup;
