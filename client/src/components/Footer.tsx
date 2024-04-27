import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>Welcome to Psychedelic Spin Records - our vinyl shop specializing in 60s and 70s rock and pop vinyl records. Located in Manchester, UK, we offer a wide selection of vintage vinyls for music enthusiasts.</p>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: info@PsychedelicSpinRecords.com<br />Phone: +44 123 456 789<br />Address: Oldham Street. Manchester. M4 1LW. United Kingdom</p>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <p>Stay updated with our latest arrivals and promotions by following us on social media:</p>
                    <div className="social-media-icons">
                        <a href="#"><img src="facebook-icon.png" alt="Facebook" /></a>
                        <a href="#"><img src="twitter-icon.png" alt="Twitter" /></a>
                        <a href="#"><img src="instagram-icon.png" alt="Instagram" /></a>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p>&copy; 2024 Psychedelic Spin Records. All rights reserved.</p>
            </div>
            <div><Link to="/admin">Adminlogin</Link></div>
        </footer>
    )
}

export default Footer;