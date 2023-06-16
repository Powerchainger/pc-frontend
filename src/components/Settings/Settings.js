import React, {useEffect, useState} from 'react';
import './Settings.css';
import SideNav from "../SideNav/SideNav.tsx";
import DeviceChart from "../DeviceChart/DeviceChart";
import Device from "../Device/Device";


const Settings = () => {

    const [image, setImage] = useState("")
    const url = "http://shambuwu.com:8000/api/predictions?dataset=levi"

    const showImage = () => {
        console.log(image)
    }

    //add auth later!
    const requestOptions = {
        method: 'GET',
    }

    useEffect(() => {
        //get devices from api instead of hardcoded!
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => setImage(data['images']['airfryer']))

    })

    return (

  <div className="Settings" data-testid="Settings">
      <button onClick={showImage}>show</button>
      <img src={image}></img>
    <div className="sidenav"><SideNav></SideNav></div>
     </div>

    )};

Settings.propTypes = {};

Settings.defaultProps = {};

export default Settings;
