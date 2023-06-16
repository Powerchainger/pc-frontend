import React from 'react';
import PropTypes from 'prop-types';
import './LoginButton.css';
import {useNavigate} from "react-router-dom";

function LoginButton(props) {
    const navigate = useNavigate()

    function login() {
        navigate("/home")
    }

    return (
    <div className="LoginButton" data-testid="LoginButton">
        <button className="login-button" onClick={login}>login</button>
    </div>
    );
}

LoginButton.propTypes = {};

LoginButton.defaultProps = {};

export default LoginButton;
