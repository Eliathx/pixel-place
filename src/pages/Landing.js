import React, { useState, useEffect } from 'react';

import '../styles/Landing.css';
import HeaderNavigationBar from '../components/HeaderNavigationBar';
import FooterNavigationBar from '../components/FooterNavigationBar';

import Leaderboard from '../components/Leaderboard/Leaderboard';

const Landing = () => {
    const [pixelsPlaced, setPixelsPlaced ] = useState(100);
    const [activeUsers , setActiveUsers ] = useState(10);
    const [contries , setCountries] = useState(3);
    const [dateLive] = useState(new Date('2024-12-3'));
    const [daysLive, setDaysLive] = useState(0);

    // Esta data se deberá obtener de la base de datos con un query del top 5 de usuarios con más pixeles colocados
    // pero por ahora la dejaré hard-coded
    
    const [leadeboardData, setLeadeboardData] = useState(
        [
            {
                user: 'Alice',
                pixelsPlaced: 1000
            },
            {
                user: 'Bob',
                pixelsPlaced: 900
            },
            {
                user: 'Charlie',
                pixelsPlaced: 752
            },
            {
                user: 'Sebastian',
                pixelsPlaced: 501
            },
            {
                user: 'Santiago',
                pixelsPlaced: 357
            }
        ]
    )
        
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
            <Leaderboard leadeboardData={leadeboardData}/>
            <FooterNavigationBar/>
        </div>
    );
};

export default Landing;
