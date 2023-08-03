import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Dialog } from "@mui/material";

interface DeviceProps {
    name?: string;
    state?: "on" | "off" | "disabled"; // Update this line
    image?: string;
}

const Device: React.FC<DeviceProps> = ({ name = "device", state = "off", image }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                >
                    <img
                        style={{ maxWidth: "100%", height: "auto" }}
                        src={`http://146.190.226.254:5000/` + String(image).slice(1)}
                        alt="image"
                    />
                </Dialog>
            )}
        </>
    );
}

export default Device;
