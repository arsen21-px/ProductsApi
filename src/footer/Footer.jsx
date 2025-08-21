import React from 'react'
import './Footer.css'
import { useState } from 'react'

const Footer = () => {
    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = () => {
        if (!email.includes("@")) {
            alert("Пожалуйста, введите корректный email с символом '@'.");
        } else {
            setSubscribed(true);
            alert("Благодарим за подписку!");
        }
    };

    return (
        <footer className="footer-container">
            <hr />
            <div className="footer-content">
                <div className="footer-legal">
                    <p>Terms · Privacy Policy</p>
                </div>
                <div className="footer-links">
                    <div className='ko'>
                        <h4 className="font-bold">Products</h4>
                        <ul className='ki'>
                            <li>Web Studio</li>
                            <li>DynamicBox Flex</li>
                            <li>Programming Forms</li>
                            <li>Integrations</li>
                            <li>Command-line</li>
                        </ul>
                    </div>
                    <div className='ko'>
                        <h4 className="font-bold">Resources</h4>
                        <ul className='ki'>
                            <li>Documentation</li>
                            <li>Tutorials & Guides</li>
                            <li>Blog</li>
                            <li>Support Center</li>
                            <li>Partners</li>
                        </ul>
                    </div>
                    <div className='ko'>
                        <h4 className="font-bold">Company</h4>
                        <ul className='ki'>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Company values</li>
                            <li>Pricing</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className='ko'>
                        <h4 className="font-bold">Subscribe</h4>
                        <p>Get the latest news and articles to your inbox every month.</p>
                        {subscribed ? (
                            <p className="subscribe-message">Вы подписались!</p>
                        ) : (
                            <div className="subscribe-input">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="sear"
                                    value={email}
                                    onChange={handleChange}
                                />
                                <button onClick={handleSubmit} className="git">
                                    <i className="bi bi-arrow-right-short"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <hr />
            <div className="footer-bottom">
                <p>Made with <span>❤</span> by <span>Siza</span></p>
                <a href="https://github.com/arsen21-px" target="_blank" rel="noopener noreferrer">
                    <i class="bi bi-github"></i>
                </a>
            </div>
        </footer>
    )
}

export default Footer