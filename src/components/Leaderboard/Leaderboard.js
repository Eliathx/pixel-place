import "./leaderboard.css";

const Leaderboard = ({leadeboardData}) => {
  return (
    <section style={{margin: "0 4rem"}}>
        <h1>Current Leaderboard</h1>
        <p>See who's at the top!</p>
      
        <div className="leaderboardContainer">
            <div className="podiumContainer">
                <div id="secondPlace">
                    2
                <span style={{top: "-1.5rem"}}>
                {leadeboardData[1].user}
                </span>
                </div>


                <div id="firstPlace">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z"></path></svg>
                    1
                    <span style={{top: "-2rem"}}>
                    {leadeboardData[0].user}
                    </span>
                </div>
                <div id="thirdPlace">
                    3
                    <span style={{top: "-1.5rem"}}>
                    {leadeboardData[2].user}
                    </span>
                </div>
            </div>

            <table className="leaderboardTable">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Pixels placed</th>
                    </tr>
                </thead>
                <tbody>
                {leadeboardData.map((data, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.user}</td>
                        <td>{data.pixelsPlaced}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </section>
  );
};

export default Leaderboard;