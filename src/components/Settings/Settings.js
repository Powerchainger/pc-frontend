import React from 'react';
import PropTypes from 'prop-types';
import './Settings.css';
import SideNav from "../SideNav/SideNav";

const Settings = () => (
  <div className="Settings" data-testid="Settings">
    <SideNav></SideNav>
  </div>
);

Settings.propTypes = {};

Settings.defaultProps = {};

export default Settings;
