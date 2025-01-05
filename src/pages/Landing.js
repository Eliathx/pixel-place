import '../styles/Landing.css';
import HeaderNavigationBar from '../components/HeaderNavigationBar';
import FooterNavigationBar from '../components/FooterNavigationBar';

const Landing = () => {
    return (
        <div id='landingContainer'>
            <HeaderNavigationBar/>

            <div id='landingTitleContainer'>
                <div id='landingTitleContainerLeft'>
                    <div id='landingTitle'>
                        A <span className='pixelFont' id='canvasWord'>
                            <span style={{color: "var(--lightRed)"}}>c</span>
                            <span style={{color: "var(--lightGreen)"}}>a</span>
                            <span style={{color: "var(--lightPurple)"}}>n</span>
                            <span style={{color: "var(--lightBlue)"}}>v</span>
                            <span style={{color: "var(--lightYellow)"}}>a</span>
                            <span style={{color: "var(--lightRed)"}}>s</span>
                        </span> for everyone.
                    </div>
                    <div id='landingDescription'>
                    Join a worldwide art experiment where every pixel counts. 
                    Create, collaborate, and shape a 
                    living canvas with thousands of others in real time. 
                    Your pixel, your impact.
                    </div>
                    <a className="joinLink" href="/signup">
                        Join now!
                    </a>
                </div>
                <img id='gameImage' src='/game.webp' alt='placeholder'/>
            </div>
            
            <div id='landingHowItWorks'>
                <div>
                    <div id='howItWorksTitleText'>
                        How it works
                    </div>
                    <div id='howItWorksDescription'>
                        Collaborate on a global canvas in just three simple steps.
                    </div>
                </div>
                <div id='howItWorksSteps'>
                    <div className='howItWorksStep'>
                        <div className='howItWorksStepNumber'>
                            1
                        </div>
                        <div className='howItWorksStepTitle'>
                            Claim your pixel.
                        </div>
                        <div className='howItWorksStepDescription'>
                            Zoom into the canvas and pick your spot. Each pixel is yours to shape!
                        </div>
                    </div>
                    <div className='howItWorksStep'>
                        <div className='howItWorksStepNumber'>
                            2
                        </div>
                        <div className='howItWorksStepTitle'>
                            Create Together
                        </div>
                        <div className='howItWorksStepDescription'>
                            Collaborate with others in real-time and watch the canvas evolve.
                        </div>
                    </div>
                    <div className='howItWorksStep'>
                        <div className='howItWorksStepNumber'>
                            3
                        </div>
                        <div className='howItWorksStepTitle'>
                            Watch It Evolve
                        </div>
                        <div className='howItWorksStepDescription'>
                            See your contribution grow as others add their touches. 
                            Protect your art, build alliances, or start something new!
                        </div>
                    </div>
                </div>
            </div>
            
            <FooterNavigationBar/>
        </div>
    );
};

export default Landing;
