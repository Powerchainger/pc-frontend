import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Device.css';
import styles from "./Device.module.css";
import {Card, CardContent, Typography, Chip, Dialog, Button} from "@mui/material";

const Device = (props) => {

    const [on, seton] = useState(true);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const toggleOn = () => {
        seton(!on);
    }

    useEffect(() => {
        if (on_off === 1) {
            toggleOn()
        }
    },[])

    const { name = "device"} = props
    const { on_off = "on"} = props

    console.log(props.image)

    return (
        <>
            <Card variant={"outlined"} onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>
                <CardContent>
                    <Typography variant={"h6"}>{name}</Typography>
                    <Typography variant={"body2"}>Current status: {on_off}</Typography>
                    {on_off == "on" ? (
                        <Chip label="on" color="success" />
                    ) : (
                        <Chip label="off" color="error" />
                    )}
                </CardContent>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                hasCloseButton
                style={{ maxWidth: "100%", maxHeight: "100%" }}
            >
                <img
                    style={{ maxWidth: "100%", height: "auto" }}
                    src={`http://shambuwu.com:5000` + props.image.slice(1)}
                    alt="image"
                />
            </Dialog>
        </>
    )};

Device.propTypes = {};

Device.defaultProps = {};

export default Device;
