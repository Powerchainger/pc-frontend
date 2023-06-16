import React from 'react';
import './Settings.css';
import SideNav from "../SideNav/SideNav";
import DeviceChart from "../DeviceChart/DeviceChart";
import Device from "../Device/Device";

const devices = [
    "toaster",
    "kettle",
    "fridge",
    "pc-laptop",
    "airfryer",
    "heater",
    "microwave",
    "monitor"
]

const Settings = () => {

    return (

  <div className="Settings" data-testid="Settings">
    <div className="sidenav"><SideNav></SideNav></div>
     </div>

    )};

Settings.propTypes = {};

Settings.defaultProps = {};

export default Settings;
