import { useState } from "react";
import '../styles/Contact.css';
import HeaderNavigationBar from '../components/HeaderNavigationBar';
import FooterNavigationBar from '../components/FooterNavigationBar';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        countryCode: "+593",
        phone: "",
        message: ""
    });
    const [statusMessage, setStatusMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatusMessage("");

        try {
            const response = await fetch('http://localhost:8000/sendEmail.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.status === 'success') {
                setStatusMessage("Correo enviado correctamente");
                setFormData({ name: "", lastName: "", email: "", phone: "", countryCode: "", message: "" });
            } else {
                setStatusMessage("Error a: " + result.message);
            }
        } catch (error) {
            setStatusMessage("Error al conectar con el servidor: " + error.message);
        }
    };

    return (
        <div>
            <HeaderNavigationBar/>
            <section className='contactSection'>
                <div className='formTitle'>
                    <h1 className='bigTitle'>Contact Us</h1>
                    <div className='formTitleText'>
                        <p>Email, call, or complete the form to learn how we can help you.</p>
                        <a href='mailto: info@pixel.com' className='emailLink'>
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.75 3H3.75C2.7875 3 2.00875 3.7875 2.00875 4.75L2 15.25C2 16.2125 2.7875 17 3.75 17H17.75C18.7125 17 19.5 16.2125 19.5 15.25V4.75C19.5 3.7875 18.7125 3 17.75 3ZM17.75 15.25H3.75V6.5L10.75 10.875L17.75 6.5V15.25ZM10.75 9.125L3.75 4.75H17.75L10.75 9.125Z" fill="#969696"/>
                            </svg>
                            <p>info@pixel.com</p>
                        </a>
                        <a href='tel: (+593-98-765-4321)'>
                            <p>(+593) 98-765-4321</p>
                        </a>
                    </div>
                </div>
                <main className='formContainer'>
                    <div className='formTitleContainer'>
                        <h2 className='bigTitle'>Get In Touch</h2>
                        <p>You can reach us anytime</p>
                    </div>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <div className='inputDataContainer'>
                                <input name='name' placeholder='First Name' value={formData.name} onChange={handleChange} required/>
                                <input name='lastName' placeholder='Last Name' value={formData.lastName} onChange={handleChange} required/>
                            </div>
                            <div className='inputDataContainerWithIcon' style={{paddingRight:'0'}}>
                                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.75 3H3.75C2.7875 3 2.00875 3.7875 2.00875 4.75L2 15.25C2 16.2125 2.7875 17 3.75 17H17.75C18.7125 17 19.5 16.2125 19.5 15.25V4.75C19.5 3.7875 18.7125 3 17.75 3ZM17.75 15.25H3.75V6.5L10.75 10.875L17.75 6.5V15.25ZM10.75 9.125L3.75 4.75H17.75L10.75 9.125Z" fill="#969696"/>
                                </svg>
                                <input name='email' type="email" placeholder='Your Email' value={formData.email} onChange={handleChange} required/>
                            </div>
                            <div className='inputDataContainerWithIcon' style={{paddingRight:'0'}}>
                                <select name='countryCode' value={formData.countryCode} onChange={handleChange} required>
                                    <option value='+593'>+593</option>
                                    <option value='+1'>+1</option>
                                    <option value='+33'>+33</option>
                                    <option value='+49'>+49</option>
                                    <option value='+81'>+81</option>
                                </select>
                                <input name='phone' style={{borderLeft:'2px solid var(--lightGray)', borderRadius: '0px 6px 6px 0px'}} placeholder='Phone Number' value={formData.phone} onChange={handleChange} required/>
                            </div>
                            <textarea name='message' placeholder='How can we help?'style={{height:'171px'}} value={formData.message} onChange={handleChange} required maxLength={300} />
                        </div>
                        <div className='submitArea'>
                            <button className='submitButton' type="submit">Submit</button>
                            {statusMessage && <p style={{color:'var(--darkGreen)'}}>{statusMessage}</p>}
                            <p style={{fontSize:'0.75rem'}}>By contacting us, you agree to receive mails from us.</p>
                        </div>
                    </form>
                </main>

            </section>
            <FooterNavigationBar/>
            <img src='redYellowDecor.svg' alt='redYellowDecor' className='bgDecor' 
            style={{top: '-227px', left: '-280px',}}/>
            
        </div>
    );
};

export default Contact;
