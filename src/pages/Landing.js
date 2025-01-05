import React, { useState, useEffect } from 'react';

import '../styles/Landing.css';
import HeaderNavigationBar from '../components/HeaderNavigationBar';
import FooterNavigationBar from '../components/FooterNavigationBar';

const Landing = () => {
    const [pixelsPlaced/* , setPixelsPlaced */] = useState(100);
    const [activeUsers/* , setActiveUsers */] = useState(10);
    const [contries/* , setCountries */] = useState(3);
    const [dateLive] = useState(new Date('2024-12-3'));
    const [daysLive, setDaysLive] = useState(0);

    useEffect(() => {
        const currentDate = new Date();
        const timeDifference = currentDate - dateLive;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        setDaysLive(daysDifference);
    }, [dateLive]);

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

            <div id='landingMeasures'>
                <div className='measureContainer'>
                    <span className='measureTitle'>
                        {pixelsPlaced - 1}+
                    </span>
                    <span className='measureDescription'>
                        pixels placed and counting!
                    </span>
                </div>
                <div className='measureContainer'>
                    <span className='measureTitle'>
                        {activeUsers - 1}+
                    </span>
                    <span className='measureDescription'>
                        active users
                    </span>
                </div>
                <div className='measureContainer'>
                    <span className='measureTitle'>
                        {contries - 1}+
                    </span>
                    <span className='measureDescription'>
                        different countries participating
                    </span>
                </div>
                <div className='measureContainer'>
                    <span className='measureTitle'>
                        {daysLive} days
                    </span>
                    <span className='measureDescription'>
                        since the board first went live!
                    </span>
                </div>
            </div>
            <FooterNavigationBar/>
            {/* <svg id='redYellowDecoration' width="624" height="943" viewBox="0 0 624 943" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_45_151)">
                <path d="M152.802 437.751L592.155 174.859" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M185.663 492.67L625.017 229.779" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M218.525 547.59L657.878 284.698" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M251.386 602.509L690.74 339.617" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M284.247 657.428L723.601 394.536" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M317.109 712.347L756.463 449.455" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M349.97 767.267L789.324 504.375" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M174.859 349.97L437.751 789.324" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M229.779 317.109L492.67 756.463" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M284.698 284.247L547.59 723.601" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M339.617 251.386L602.509 690.74" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M394.536 218.524L657.428 657.878" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M449.456 185.663L712.347 625.017" stroke="#D9D9D9" stroke-opacity="0.5"/>
                <path d="M504.375 152.801L767.267 592.155" stroke="#D9D9D9" stroke-opacity="0.5"/>
                </g>
                <rect x="328" y="481.031" width="64.3398" height="64.7983" transform="rotate(-30.89 328 481.031)" fill="#FFCB3E" fill-opacity="0.15"/>
                <rect x="416" y="503.031" width="64.3398" height="64.7983" transform="rotate(-30.89 416 503.031)" fill="#FF8787" fill-opacity="0.16"/>
                <defs>
                <clipPath id="clip0_45_151">
                <rect width="713.077" height="713.077" fill="white" transform="translate(0 650.894) rotate(-65.8946)"/>
                </clipPath>
                </defs>
            </svg> */}

        </div>
    );
};

export default Landing;
