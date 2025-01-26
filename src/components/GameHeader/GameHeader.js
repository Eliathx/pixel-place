const GameHeader = ({timeLeft, username}) => {
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className='gameHeaderContainer'>
      <ul className='headerNavigationBar' style={{ justifyContent: "space-between" }}>
        <li>
          <a href="/" className='logo'>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.5414 8.11472L16.5414 2.78139C16.3707 2.70556 16.1861 2.66638 15.9994 2.66638C15.8126 2.66638 15.628 2.70556 15.4574 2.78139L3.45735 8.11472C3.43069 8.12672 3.41202 8.14672 3.38535 8.16139C3.34802 8.18006 3.30802 8.19206 3.27335 8.21472C3.24402 8.23472 3.22135 8.26006 3.19335 8.28139C3.09589 8.35382 3.01041 8.44111 2.94002 8.54006C2.91335 8.57739 2.88535 8.61072 2.86135 8.64806C2.82167 8.71852 2.78778 8.7921 2.76002 8.86805C2.74802 8.90406 2.72935 8.93739 2.71869 8.97339C2.6852 9.0905 2.66771 9.21159 2.66669 9.33339V22.6667C2.66669 23.1947 2.97602 23.6707 3.45869 23.8854L15.4587 29.2187C15.632 29.2961 15.816 29.3334 16 29.3334C16.1857 29.3286 16.3683 29.285 16.536 29.2054L16.5414 29.2187L28.5414 23.8854C28.7772 23.7808 28.9776 23.6099 29.1182 23.3936C29.2588 23.1773 29.3336 22.9247 29.3334 22.6667V9.33339C29.3336 9.07537 29.2588 8.82286 29.1182 8.60651C28.9776 8.39017 28.7772 8.21932 28.5414 8.11472ZM16 5.46005L24.7174 9.33339L16 13.2067L14.256 12.4321L7.28402 9.33339L16 5.46005ZM17.3334 25.9481V15.5334L26.6667 11.3854V21.8014L17.3334 25.9481Z" 
              fill="var(--lightRed)"/>
            </svg>
            <span className='pixelFont'>pixel.place</span>
          </a>
        </li>
        {timeLeft > 0 ? <span>Next pixel available in: <b>{formatTime(timeLeft)}</b></span> : <span>Place your pixel in the grid!</span>}
        <a href="/contact">@{username}</a>
      </ul>
    </div>
  );
};

export default GameHeader;