import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext, LogInContext, RegisterContext } from '../UserContext'
import { Button } from './Button'
import './LoginForm.css'

const LoginFrom = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { authCode, setAuthCode } = useContext(AuthContext);
    const { setIsLoginForm } = useContext(RegisterContext);
    const { setIsSlider } = useContext(LogInContext);
    const [isLoading, setIsLoading] = useState(false);

    const [err, setErr] = useState(null);
   
    const handleSubmit = (event) =>{
            try {
                const LogIn = async () => {
                  const dataResult = await axios({
                    url: 'http://localhost:4000/graphql',
                    method: 'POST',
                    data: {
                    query: `mutation {
                        authenticate(email:"${email}", password:"${password}")
                      }`
                    }
                  })
                  setIsLoading(false);
                  setAuthCode(dataResult.data.data.authenticate)
                }
                LogIn();
                } catch(err) {
                setErr(err)
                setIsLoading(false)
            }
          event.preventDefault()
    }

    useEffect(() => {
        if(authCode !==null && authCode !== "") {
            setIsSlider(true)
        }
    }, [authCode])
    

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-container">
                <h2 className="login-email-header">
                    LOGIN
                </h2>
                <div className="login-email-input">
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={e=> setEmail(e.target.value)} type="email" id="email" pattern=".+@gmail.com" size="30" required />
                </div>
                <div className="login-email-password">
                    <label htmlFor="pass">Password</label>
                    <input value={password} onChange={e=> setPassword(e.target.value)} type="password" id="pass" name="password" minLength="8" required />
                </div>
                <Button buttonSize='btn--large'>LOGIN</Button>
                <div className="login-register-here">
                    <p className="register-here">
                     {`No Account Yet? `}
                        <Button onClick={()=> setIsLoginForm(true)} buttonStyle='btn--blank'>REGISTER HERE</Button>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default LoginFrom
