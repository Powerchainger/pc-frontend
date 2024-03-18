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
    const modelType = localStorage.getItem("selectedModel") || "fhmm";

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
        //sendFeedback(name, localStorage.getItem("sync"), "true")
    }

    const handleFeedbackNo = () => {
        localStorage.setItem("feedback " + name, "false")
        setShowFeedback(false)
        // @ts-ignore
        //sendFeedback(name, localStorage.getItem("sync"), "false")
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

    let borderColor;

    if (state === 'on') {
        borderColor = "success.main";
    } else if (state === 'off') {
        borderColor = "error.main";
    } else {
        borderColor = "grey.500";
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

    return (
        <>
            <Card
                variant={"outlined"}
                onClick={handleClickOpen}
                className="group cursor-pointer flex justify-between border-l-4 transition-all duration-100 ease-in-out"
                sx={{
                    cursor: 'pointer',
                    borderLeft: 5,
                    borderLeftColor: borderColor,
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <CardContent>
                    <Typography variant={"h6"}>{name}</Typography>
                    <Typography variant={"body2"}>Current status: </Typography>
                    {renderSwitch(state)}
                </CardContent>
                {state !== 'disabled' && modelType === "convexopt" && (  // Check modelType here
                    <Box
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        sx={{
                            padding: 2,
                            alignSelf: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {showFeedback ? (
                            <>
                                <Typography variant={"caption"}>Is this prediction accurate?</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button size="small" onClick={handleFeedbackYes}>yes</Button>
                                    <Button size="small" onClick={handleFeedbackNo}>no</Button>
                                </Box>
                            </>
                        ) : (
                            <Typography variant={"body2"}>Thank you for your feedback!</Typography>
                        )}
                    </Box>
                )}
            </Card>

            {state !== 'disabled' && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    style={{ maxWidth: "100%", maxHeight: "100%" , textAlign: "center"}}
                >
                    <img
                        style={{ maxWidth: "100%", height: "auto" }}
                        src={`http://demo.powerchainger.nl:5000/` + String(image).slice(1)}
                        alt="image"
                    />
                </Dialog>
            )}
        </>
    );
}

export default Device;
