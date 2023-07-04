import React, {useState} from 'react';
import './login.css';
import logo from "./images/Vattenfall-logo.png"
import {useNavigate} from "react-router-dom";


const Login = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)

    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)

    }


    const tryLogin = () => {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }


        fetch("http://77.172.199.5:8000/api/login_check", requestOptions)//ip -> shambuwu.com waneer het domein terug is
            .then(response => {
                if (!response.ok) throw new Error(response.status)
                // eslint-disable-next-line react-hooks/rules-of-hooks
                else {
                    navigate("/home");
                    localStorage.setItem("username", username)
                }

            })
            .then(data =>
                localStorage.setItem("token", JSON.stringify(data["token"])))
            .catch(error => {
                setErrorMessage("E-mail or password are inccorect")
            })

    }


    return (
        <div className="outer-ring">
            <div className="imgs2">
                <img className="top-img" src={logo}/>
            </div>
            <div className="login" data-testid="Login">
                <div className="sub">
                    <div>
                    </div>
                    <div className="content">
                        <div className="login-text">
                            <h1>Login</h1>
                        </div>
                        <div className="name-container">
                            <label form="username">Username</label>
                            <input type="text" className="name" id="username" onChange={handleUsernameChange}/>
                        </div>
                        <div className="pw-container">
                            <label form="password">Password</label>
                            <input type="password" className="password" id="password" onChange={handlePasswordChange}/>
                        </div>
                        <div className="login-container">
                            <text id="error-message">{errorMessage}</text>
                            <div className="LoginButton" data-testid="LoginButton">
                                <button className="login-button" onClick={tryLogin}>login</button>
                            </div>
                        </div>
                        <ul>
                            <li><a href=""> Log in without password</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <img src={logo} className="imgs2"/>
            <div className="text-bottom">
                <text>Service</text>
                <text>Privacy & Cookies</text>
                <text>About Vattenfall</text>
            </div>
        </div>
    );
}


Login.propTypes = {};

Login.defaultProps = {};

export default Login;
