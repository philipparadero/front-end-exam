import React, { useContext } from 'react';
import { Button } from './Button';
import './Navbar.css';
import Logo from './Logo';
import { AuthContext, LogInContext, RegisterContext } from '../UserContext';
import { Link } from 'react-router-dom';

function Navbar() {

    const { isSlider, setIsSlider } = useContext(LogInContext);
    const { setIsLoginForm } = useContext(RegisterContext);
    const { authCode, setAuthCode } = useContext(AuthContext);
    

    const handleClick = () =>{
        setIsSlider(!isSlider)
        setIsLoginForm(false)
        window.scrollTo(0, 0)
    }

    const handleLogout = () => {
        setAuthCode(null)
        window.scrollTo(0, 0)
    }

    return (
        <section className="navbar-section">
            <div className='navbar-container'>
                <Logo style='lightBg'/>
                {  !authCode ? 
                    (
                        <Button buttonStyle='btn--blank' onClick={handleClick}>{ isSlider ? <Link to='/' className='login-btn'> LOGIN </Link>: 'Close' }</Button>
                    ) : (   
                    <div className="button-logout">
                        <Link to='/'> <Button buttonStyle='btn--blank' onClick={handleLogout}>LOGOUT</Button></Link>
                    </div>
                    ) }
            </div>
        </section>
    )
}

export default Navbar
