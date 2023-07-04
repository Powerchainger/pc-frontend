import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './DeviceList.css';
import PowerIcon from '@mui/icons-material/Power';
import {NavLink} from "react-router-dom";
import Device from "../Device/Device";
import {Grid, Box, CircularProgress, Typography, Alert} from '@mui/material';

const DeviceList = () => {

    const [devices, setDevices] = useState([])
    const [results, setResults] = useState(null)
    const [time, setTime] = useState(null)
    const [loading, setLoading] = useState(false)
    const [deviceStates, setDeviceStates] = useState([])
    const url = "http://77.172.199.5:8000/api/predictions?dataset=levi" //ip -> shambuwu.com waneer het domein terug is



    //add auth later!
    const requestOptions = {
        method: 'GET',
    }

    const dummyList = {
        EV: {
            image: null,
            name: 'EV',
            state: 'disabled'
        },
        lamp: {
            image: null,
            name: 'lamp',
            state: 'disabled'
        },
        television: {
            image: null,
            name: 'television',
            state: 'disabled'
        },
        airConditioner: {
            image: null,
            name: 'air conditioner',
            state: 'disabled'
        }
    };

    useEffect(() => {
        if(localStorage.getItem('images') != null) {
            setResults(JSON.parse(localStorage.getItem('images')))
            setDeviceStates(JSON.parse(localStorage.getItem('device_states')))
            setTime("Last Sync: " + localStorage.getItem('time'))
            setLoading(false)
        }

        setLoading(true)
        console.time("fetchtimer prediction")
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                setDevices(Object.keys(data['images']))
                setResults(data['images'])
                setDeviceStates(data['device_states'])
                localStorage.setItem('images', JSON.stringify(data['images']))
                localStorage.setItem('device_states', JSON.stringify(data['device_states']))
                let current = new Date()
                setTime("Last Sync: " + current.toLocaleTimeString())
                localStorage.setItem('time', current.toLocaleTimeString())
                setLoading(false)
                console.timeEnd("fetchtimer prediction")
            })

    }, [])

    return (
        <div>
            <h2>Registered devices</h2>

            {loading ? (
                <Box sx={{
                }}>
                    <CircularProgress />
                </Box>
            ) : (
                <></>
            )}

            {time == null ? (
                <Typography>
                    No devices registered
                </Typography>
            ) : (
                <Typography>
                    {time}
                </Typography>
            )}

            {results == null ? (
                <></>
            ) : (
                <Grid container spacing={2}>
                    {
                        Object.entries(results).map(([key, value], index) =>
                            <Grid item xs={4}>
                                <Device name={key} image={value} state={deviceStates[key]}></Device>
                                {deviceStates[index]}
                            </Grid>
                        )
                    }
                    {
                        Object.entries(dummyList).map(([key, value], index) =>
                            <Grid item xs={4} disabled>
                                <Device name={key} image={value.image} state={value.state}></Device>
                            </Grid>
                        )
                    }
                </Grid>
            )}
        </div>
    )


}
DeviceList.propTypes = {};

DeviceList.defaultProps = {};

export default DeviceList;
