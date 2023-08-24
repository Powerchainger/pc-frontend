import React, { useState } from 'react';
import {Card, CardContent, Typography, Chip, Dialog, Button, Box} from "@mui/material";

interface DeviceProps {
    name?: string;
    state?: "on" | "off" | "disabled"; // Update this line
    image?: string;
}

const Device: React.FC<DeviceProps> = ({ name = "device", state = "off", image }) => {
    const [open, setOpen] = useState(false);
    const [showFeedback, setShowFeedback] = useState(true)
    const handleClickOpen = () => {
        setOpen(true);
        if (localStorage.getItem("feedback " + name) === "true") {
            setShowFeedback(true)
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFeedbackYes = () => {
        localStorage.setItem("feedback " + name, "false")
        setShowFeedback(false)
        // @ts-ignore
        sendFeedback(name, localStorage.getItem("sync"), "true")
    }

    const handleFeedbackNo = () => {
        localStorage.setItem("feedback " + name, "false")
        setShowFeedback(false)
        // @ts-ignore
        sendFeedback(name, localStorage.getItem("sync"), "false")
    }

    const sendFeedback = (device: String, time: String, feedback: String) => {
        fetch('http://localhost:8000/feedback', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "device": device, "time" : time, "feedback" : feedback })
        })
            .then(response => response)
            .then(response => console.log(response.text()))
    }

    let borderColor = state !== "off" ? "success.main" : "error.main"

    if (state === 'disabled') {
        borderColor = "info.main"
    }

    const renderSwitch = (param: string) => {
        switch (param) {
            case "off":
                return <Chip label="off" color="error" />;
            case 'disabled':
                return <Chip label="disabled" style={{ backgroundColor: 'gray', color: 'white' }} />;
            default:
                return <Chip label="on" color="success" />;
        }
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <Card variant={"outlined"} onClick={handleClickOpen} sx={{ cursor: 'pointer', borderLeft: 5, borderLeftColor: borderColor}}>
                <CardContent>
                    <Typography variant={"h6"}>{name}</Typography>
                    <Typography variant={"body2"}>Current status: </Typography>
                    {renderSwitch(state)}
                </CardContent>
            </Card>
            {state !== 'disabled' && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    style={{ maxWidth: "100%", maxHeight: "100%" , textAlign: "center"}}
                >
                    <img
                        style={{ maxWidth: "100%", height: "auto" }}
                        src={`http://146.190.226.254:5000/` + String(image).slice(1)}
                        alt="image"
                    />
                        {showFeedback?
                            <div><Typography variant={"h6"}>Is this prediction correct?</Typography>
                                <Button onClick={handleFeedbackYes}>yes</Button>
                                <Button onClick={handleFeedbackNo}>no</Button>
                            </div>:null
                        }
                        {!showFeedback?
                            <Typography variant={"h6"}>Thanks for your feedback!</Typography>:null
                        }
                </Dialog>
            )}
        </>
    );
}

export default Device;
