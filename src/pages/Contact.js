import '../styles/Contact.css';
import HeaderNavigationBar from '../components/HeaderNavigationBar';
import FooterNavigationBar from '../components/FooterNavigationBar';

const Contact = () => {
    return (
        <div id='contactContainer'>
            <HeaderNavigationBar/>
            Contact
            <FooterNavigationBar/>
            <img src='redYellowDecor.svg' alt='redYellowDecor' className='bgDecor' 
            style={{top: '-227px', left: '-280px',}}/>
            
        </div>
    );
};

export default Contact;
