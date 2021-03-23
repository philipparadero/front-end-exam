import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { AuthContext, LogInContext, RegisterContext } from '../UserContext';
import { Button } from './Button'

const RegisterForm = () => {

    const { setIsLoginForm } = useContext(RegisterContext);
    const [registered, setRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const { setIsSlider } = useContext(LogInContext);
    const { authCode, setAuthCode } = useContext(AuthContext);
    const history = useHistory();

    const handleLogin = (event) => {
        setIsLoginForm(false)
        event.preventDefault()
    }


    const handleSubmit = (event) =>{
        if(validate){
            try {
            const registerUser = async () => {
            const dataResult = await axios({
                url: 'http://localhost:4000/graphql',
                method: 'POST',
                data: {
                query: `mutation {
                    register(email:"${email}", password:"${password}")
                }`
                }
            })
            setIsLoading(false);
            setRegistered(dataResult.data)
            }
            registerUser();
                } catch(err) {
                setErr(err)
                setIsLoading(false)
                }
        } 
      event.preventDefault()
    }

    const handleFormSubmit = (event)=>{
        event.preventDefault()
    }

    const validate = () => {
        if(password2 !== undefined && password !== undefined){
            if(password2 === password){
                return true;
             }
        }
        history.go(0)
    }

    return (
        <form onSubmit={handleFormSubmit} className="login-form">
            <div className="login-form-container">
                <h2 className="login-email-header">
                    REGISTER
                </h2>
                <div className="login-email-input">
                    <label htmlFor="register-email">Email</label>
                    <input type="email" onChange={e=> setEmail(e.target.value)} id="register-email"  name="register-email" pattern=".+@gmail.com" size="30" required />
                </div>
                <div className="login-email-password">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={e=> setPassword(e.target.value)} id="password" name="password" minLength="8" required />
                </div>
                <div className="login-email-password">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" onChange={e=>setPassword2(e.target.value)} id="confirm_password" name="confirm_password" minLength="8" required />
                </div>
                <Button onClick={handleSubmit} buttonSize='btn--large'>REGISTER</Button>
                <div className="login-register-here">
                    <p className="register-here">
                        {`Already have an account? `}
                        <Button onClick={handleLogin} buttonStyle='btn--blank'>LOGIN HERE</Button>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default RegisterForm
