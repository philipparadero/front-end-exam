import React from 'react'
import './Footer.css'
import Logo from './Logo'
import ToTop from './ToTop'

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-details">
                        <Logo />
                        <div className="footer-paragraph">
                            サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト
                        </div>
                    </div>
                    <div className="to-top-button">
                        <ToTop />
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="footer-copyright-container">
                    Copyright©2007-2019 Blog Inc.
                </div>
            </div>
        </footer>
    )
}

export default Footer
