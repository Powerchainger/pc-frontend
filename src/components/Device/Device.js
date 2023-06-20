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
    let borderColor = props.state !== 0 ? "success.main" : "error.main"

    if (props.state === 'disabled') {
        borderColor = "info.main"
    }

    console.log(props.image)

    const renderSwitch = (param) => {
        switch (param) {
            case 0:
                return <Chip label="off" color="error" />;
            case 'disabled':
                return <Chip label="disabled" color="info" />;
            default:
                return <Chip label="on" color="success" />;
        }
    };

    return (
        <>
            <Card variant={"outlined"} onClick={handleClickOpen} sx={{ cursor: 'pointer' }} sx={{ borderLeft: 5, borderLeftColor: borderColor}}>
                <CardContent>
                    <Typography variant={"h6"}>{name}</Typography>
                    <Typography variant={"body2"}>Current status: </Typography>
                    {renderSwitch(props.state)}
                </CardContent>
            </Card>
            {props.state !== 'disabled' ? (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    hasCloseButton
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                >
                    <img
                        style={{ maxWidth: "100%", height: "auto" }}
                        src={`http://shambuwu.com:5000/` + String(props.image).slice(1)}
                        alt="image"
                    />
                </Dialog>
            ) : (
                <></>
            )}
        </>
    )};

Device.propTypes = {};

Device.defaultProps = {};

export default Device;
