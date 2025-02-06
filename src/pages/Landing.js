import React, { useState, useEffect } from 'react';

import '../styles/Landing.css';
import HeaderNavigationBar from '../components/HeaderNavigationBar';
import FooterNavigationBar from '../components/FooterNavigationBar';

import Leaderboard from '../components/Leaderboard/Leaderboard';

const Landing = ({username}) => {
    const [pixelsPlaced, setPixelsPlaced ] = useState(0);
    const [activeUsers , setActiveUsers ] = useState(0);
    const [countries , setCountries] = useState(0);
    const [dateLive, setDateLive] = useState(new Date('2000-1-1'));
    const [daysLive, setDaysLive] = useState(0);

    const [leaderboardData, setLeaderboardData] = useState([])
        
    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await fetch('http://localhost:8000/getLeaderboard.php');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();

                const formattedData = data.map(user => ({
                    user: user.username,
                    pixelsPlaced: user.pixelsplaced
                }));

                setLeaderboardData(formattedData);
                console.log("Leaderboard data:", formattedData);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            }
        };

        fetchLeaderboardData();
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        const timeDifference = currentDate - dateLive;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        setDaysLive(daysDifference);
    }, [dateLive]);

    useEffect(() => {
        const fetchMeasurements = async () => {
            try {
                const response = await fetch('http://localhost:8000/getMeasurements.php');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const measurementData = await response.json();

                setPixelsPlaced(measurementData.totalPixelsPlaced);
                setActiveUsers(measurementData.usersWithAtLeastOnePixel);
                setCountries(measurementData.countries);
                setDateLive(new Date(measurementData.firstUserCreationDate));
                console.log("Measurements data:", measurementData);

            } catch (error) {
                console.error("Error fetching measurements data:", error);
            } 
        }

        fetchMeasurements();
    }, []);

    return (
        <div>
            <div style={{overflowY: 'hidden', height: 'fit-content'}}>
                <HeaderNavigationBar username={username}/>
                <section id='landingTitleContainer'>
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
                        {
                            username ?
                            <a className="joinLink" href="/play">
                                Play now!
                            </a>:
                            <a className="joinLink" href="/signup">
                                Join now!
                            </a>
                        }
                    </div>
                    <img id='gameImage' src='/game.webp' alt='placeholder'/>
                </section>
                
                <section id='landingHowItWorks'>
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
                </section>

                <section id='landingMeasures'>
                    <div className='measureContainer'>
                        <span className='measureTitle'>
                            {pixelsPlaced >> 1?pixelsPlaced-1+"+":pixelsPlaced}
                        </span>
                        <span className='measureDescription'>
                            pixels placed and counting!
                        </span>
                    </div>
                    <div className='measureContainer'>
                        <span className='measureTitle'>
                            {activeUsers >> 1?activeUsers+"+":activeUsers}
                        </span>
                        <span className='measureDescription'>
                            active users
                        </span>
                    </div>
                    <div className='measureContainer'>
                        <span className='measureTitle'>
                            {countries >> 1?countries-1+"+":countries}
                        </span>
                        <span className='measureDescription'>
                            {countries === 1?"country participating" :"different countries participating"}
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
                    
                </section>
                <section style={{marginLeft: '4rem', marginRight: '4rem'}}>
                    <h1>Current Leaderboard</h1>
                    <p>See who's at the top!</p>
                    <Leaderboard leaderboardData={leaderboardData}/>
                </section>
                <FooterNavigationBar/>
                <img src='redYellowDecor.svg' alt='redYellowDecor' className='bgDecor' 
                style={{top: '173px', right: '-318px', }}/>
                <img src='blueDarkBlueDecor.svg' alt='blueDarkBlueDecor' className='bgDecor'
                style={{top: '520px', left: '-454px',}}/>
                {/* style={{top: '901px', left: '-454px',}}/> */}
                <img src='purpleGreenDecor.svg' alt='purpileGreenDecor' className='bgDecor'
                style={{top: '1100px', right: '-318px',}}/>
            </div>
        </div>
    );
};

export default Landing;
