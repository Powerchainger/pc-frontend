import React from 'react';
import PropTypes from 'prop-types';
import './login.css';
import logo from "./images/logo.png"
import {Route, useNavigate} from "react-router-dom";
import LoginButton from "../LoginButton/LoginButton";


const displayLoginError = () => {

}

const Login = () => {

    return (
  <div className="login" data-testid="Login">
    <div className="sub">
        <div>
            <div className="imgs">
                <div className="container-image"></div>
                <img src={logo} alt="logo"></img>
            </div>
        </div>
        <div className="content">
            <h1>Login</h1>
            <div className="name-container">
                <input type="text" placeholder="username" className="name" id="un"/>
            </div>
            <div className="pw-container">
                <input type="text" placeholder="password" className="password" id="pw"/>
            </div>
            <div className="login-container">
                <LoginButton></LoginButton>
            </div>
        </div>
    </div>
  </div>
);
}



Login.propTypes = {};

Login.defaultProps = {};

export default Login;
