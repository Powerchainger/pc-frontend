import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './DeviceList.css';
import PowerIcon from '@mui/icons-material/Power';
import {NavLink} from "react-router-dom";
import Device from "../Device/Device";

const DeviceList = () => {

    const [devices, setDevices] = useState(0)

    useEffect(() => {
        //get devices from api instead of hardcoded!
        const devices = {
            "toaster": 1,
            "kettle": 0,
            "fridge": 1,
            "pc": 1,
            "airfryer": 0,
            "heater": 0,
            "microwave": 0,
            "monitor": 1
        }

        for(let device in devices) {
            if (devices[device] === 0) {
                devices[device] = "off"
            } else {
                devices[device] = "on"
            }
        }

        setDevices(devices)

    }, [])

    return (
        <div>
            <h2>Registered devices</h2>

            {
                Object.entries(devices).map(([deviceName, onOff]) => <div className="devices">
                    <Device name={deviceName} on_off={onOff}></Device>
                </div>)
            }

        </div>
    )


}
DeviceList.propTypes = {};

DeviceList.defaultProps = {};

export default DeviceList;
