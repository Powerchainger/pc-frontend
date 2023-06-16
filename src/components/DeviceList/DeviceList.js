import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './DeviceList.css';
import PowerIcon from '@mui/icons-material/Power';
import {NavLink} from "react-router-dom";
import Device from "../Device/Device";

const DeviceList = () => {

    const [devices, setDevices] = useState([])
    const url = "http://shambuwu.com:8000/api/predictions?dataset=levi"

    //add auth later!
    const requestOptions = {
        method: 'GET',
    }

    useEffect(() => {
        //get devices from api instead of hardcoded!
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => setDevices(Object.keys(data['images'])))
        console.log(devices)



    }, [])

    return (
        <div>
            <h2>Registered devices</h2>

            {
                devices.map( device =>
                    <Device name={device}></Device>
                )
            }

        </div>
    )


}
DeviceList.propTypes = {};

DeviceList.defaultProps = {};

export default DeviceList;
