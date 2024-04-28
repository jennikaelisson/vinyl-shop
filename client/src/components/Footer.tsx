import aboutImage from "../images/About.png";
import contactImage from "../images/Contact.png";
import followImage from "../images/Follow.png";
import AdminLoginLink from "./AdminLink";


const Footer = () => {
    return (
      <>
            <div className="footer-container">
                <div className="footer-section">
                <img src={aboutImage} alt="About" className="retro-buttons" />
                    <p>Welcome to Psychedelic Spin Records - our vinyl shop specializing in 60s and 70s rock and pop vinyl records. Located in Manchester, UK, we offer a wide selection of vintage vinyls for music enthusiasts.</p>
                </div>
                <div className="footer-section">
                <img src={contactImage} alt="Contact" className="retro-buttons" />
                    <p>Email: info@PsychedelicSpinRecords.com<br />Phone: +44 123 456 789<br />Address: Oldham Street. Manchester. M4 1LW. United Kingdom</p>
                </div>
                <div className="footer-section">
                <img src={followImage} alt="Follow" className="retro-buttons" />
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
            <AdminLoginLink />
      </>
    )
}

export default Footer;