import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="footer">
            <h5 className="text-center mt-1">All Right Reserved &copy; Vishal Parmar</h5>
            <p className="text-center mt-1">
                |
                <Link to="/about" className="footer-link">
                    About
                </Link>{' '}
                |
                <Link to="/contact" className="footer-link">
                    Contact Us
                </Link>{' '}
                |
                <Link to="/policy" className="footer-link">
                    Privacy Policy
                </Link>{' '}
                |
            </p>
        </div>
    );
};

export default Footer;
