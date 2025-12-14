import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login, SignUp } from "../Components/Authen";
import "../styles.css";

const services = [
    {
    id: 1,
    title: "Our Sweet Collection",
    description: "Explore a wide variety of fresh, delicious sweets crafted with love.",
    details: "At Sweet-Corner, every sweet is prepared with a little extra love, care, and tradition. Our collection features a delightful range of treats—from classic favorites to unique specialties—made fresh every day using high-quality ingredients. Whether you're celebrating a special moment or simply craving something sweet, our sweets are crafted to bring you joy in every bite. Discover flavors that remind you of home, celebrations, and happiness, all in one sweet corner.",
    image: "sweet_showcase.jpg"
}
];
const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const navigate = useNavigate();
    return (
        <div>
            <div className={showLogin || showSignUp ? "blur" : ""}>
                <nav className="navbar">
                    <div className="navbar-logo">SweetCorner</div>
                    <div className="navbar-container">
                        <ul className="navbar-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#aboutt">About</a></li>
                            <li><a href="#servicess">Services</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>

                        <button className="contact-button login" onClick={() => setShowLogin(true)}>
                            Login
                        </button>
                    </div>
                </nav>

                <div id="home" className="home">
                    <div className="home-content">
                        <img src="landingpgimg1.jpg" alt="" />
                        <div className="text-content">
                            <h1>SweetCorner</h1>
                            <p>Where every sweet is made with a little extra love and care.</p>
                            <button className="get-started">
                                <a href="#servicess">View Services</a>
                            </button>
                        </div>
                    </div>
                </div>

                <div id="aboutt" className="aboutt">
                    <div className="aboutt-content">
                        <h1>About SweetCorner</h1>
                        <h3>Where Quality Meets Tradition</h3>
                        <p>
                           At SweetCorner, quality is our priority. We carefully select ingredients, follow authentic recipes, 
                           and maintain strict standards to ensure every sweet is rich in taste and beautifully crafted. With a 
                           blend of traditional flavors and modern touches, we aim to offer you sweets that are both delightful 
                           and memorable.
                        </p>
                    </div>
                    <div className="aboutt-image">
                        <img 
                            src="abt_left.jpg" 
                            alt="About SweetCorner" 
                            style={{ height: "420px", width: "400px" }} 
                        />
                    </div>
                </div>

                <div id="servicess" className="servicess-container">
                    <div className="top-section">
                        <div className="servicess-text">
                            <h2>Discover Delicious Sweets</h2>
                            <p>Freshly crafted treats made with love and care</p>
                    </ div>
                        <div className="contract-farming-card">
                            <img 
                                src="sweet_showcase.jpg" 
                                alt="Sweet Collection" 
                                className="service-img" 
                            />
                            <div className="servicess-content">
                                <h3>Our Sweet Collection</h3>
                                <p>Explore a wide range of fresh, handcrafted sweets made to brighten your day.</p>
                                <button onClick={() => setSelectedService(services[0])}>Read More</button>
                            </div>
                        </div>
                    </div>

                    <div className="servicess-grid">
                        {services.slice(1).map((service) => (
                            <div key={service.id} className="servicess-card">
                                <img src={service.image} alt={service.title} className="service-img" />
                                <div className="servicess-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <button onClick={() => setSelectedService(service)}>Read More</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedService && (
                        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <span className="close-button" onClick={() => setSelectedService(null)}>
                                    &times;
                                </span>
                                <div className="modal-img">
                                    <img src={selectedService.image} alt={selectedService.title} className="modal-img" />
                                </div>
                                <div className="modal-text">
                                    <h2>{selectedService.title}</h2>
                                    <p>{selectedService.details}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div id="contact" className="contact-container">
                    <h2 className="contact-title">Get in touch</h2>
                    <p className="contact-subtitle">We're here to assist you!</p>
                    <form className="contact-form">
                        <label htmlFor="name">
                            Name <span>*</span>
                        </label>
                        <input type="text" id="name" placeholder="Enter your name" required />

                        <label htmlFor="email">
                            Email address <span>*</span>
                        </label>
                        <input type="email" id="email" placeholder="Enter your mail" required />

                        <label htmlFor="phone">
                            Phone number <span>*</span>
                        </label>
                        <input type="tel" id="phone" placeholder="95674-86488" required />

                        <label htmlFor="message">Message</label>
                        <textarea id="message" placeholder="Write your message here..."></textarea>

                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {showLogin && (
        <Login setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
      )}
      {showSignUp && (
        <SignUp setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} />
      )}
        </div>
    );
};

export default LandingPage