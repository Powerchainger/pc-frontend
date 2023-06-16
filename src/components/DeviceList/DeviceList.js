import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './DeviceList.css';
import PowerIcon from '@mui/icons-material/Power';
import {NavLink} from "react-router-dom";
import Device from "../Device/Device";
import { Grid } from '@mui/material';

const DeviceList = () => {

    const [devices, setDevices] = useState([])
    const [results, setResults] = useState([{}])
    const url = "http://shambuwu.com:8000/api/predictions?dataset=levi"

    //add auth later!
    const requestOptions = {
        method: 'GET',
    }

    useEffect(() => {
        //get devices from api instead of hardcoded!
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                setDevices(Object.keys(data['images']))
                setResults(data['images'])
            })
        console.log(devices)
    }, [])

    return (
        <div>
            <h2>Registered devices</h2>

            <Grid container spacing={2}>
                    {
                        Object.entries(results).map(([key, value]) =>
                            <Grid item xs={4}>
                                <Device name={key} image={value}></Device>
                            </Grid>
                        )
                    }
            </Grid>
        </div>
    )


}
DeviceList.propTypes = {};

DeviceList.defaultProps = {};

export default DeviceList;
