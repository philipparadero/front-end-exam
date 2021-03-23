import React, { useContext } from 'react'
import { LogInContext, RegisterContext } from '../UserContext'
import './HeroArea.css'
import LoginFrom from './LoginFrom'
import RegisterForm from './RegisterForm'
import Slider from './Slider'

const HeroArea = () => {

    const {isSlider}=  useContext(LogInContext)
    const { isLoginForm } = useContext(RegisterContext);

    return (
        <div className="heroarea-section">
            {!isSlider && !isLoginForm && <LoginFrom />}
            {isSlider && !isLoginForm && <Slider />}
            {isLoginForm && <RegisterForm />}
        </div>
    )
}
export default HeroArea
