import React, { useEffect, useState, useRef, useContext } from "react";
import Layout from "../components/Layout";
import {Grid, CircularProgress, Box, Typography, LinearProgress} from "@mui/material";
import Device from "../components/Device";
import { getPredictions5m } from '../api/Api';
import { Notice } from '../components/types';
import NewNoticesContext from '../hooks/NewNoticesContext';
import BubbleChart from "../components/BubbleChart";
import { IconButton } from "@mui/material";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



interface DeviceData {
    image: string | undefined;
    name: string;
    state: "on" | "off" | "disabled";
    value: number;
}


interface ApiResponse {
    device_states: Record<string, number>;
    images: Record<string, string>;
    [key: string]: any;
}

const DevicesPage = () => {
    const [devicesList, setDevicesList] = useState<Record<string, DeviceData>>({});
    const prevDevicesList = useRef<Record<string, DeviceData>>({});
    const [lastSynced, setLastSynced] = useState<Date | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const context = useContext(NewNoticesContext);
    if (!context) {
        throw new Error('DevicesPage must be used within a NewNoticesContext.Provider');
    }
    const { setNewNotices } = context;

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const dataset = "levi";
            const response = await getPredictions5m(dataset);

            if (!response || !response.data) {
                throw new Error("No response from server");
            }

            const data: ApiResponse = response.data;

            const updatedList: Record<string, DeviceData> = {};
            let newNotices: Notice[] = [];

            Object.entries(data.device_states).forEach(([key, value]) => {
                updatedList[key] = {
                    image: data.images[key],
                    name: key,
                    state: value > 0 ? "on" : "off",
                    value: value, // Assign the energy consumption value
                };

                if (value > 500 && (!prevDevicesList.current[key] || prevDevicesList.current[key].state !== "on")) {
                    newNotices.push({
                        device: key,
                        time: new Date().toLocaleString(),
                        wattage: value,
                        extra: `${key} has been identified as a high energy consumer. It is recommended to ensure ${key} is not operating during unintended periods.`
                    });
                }
            });

            const savedNotices = JSON.parse(localStorage.getItem('notices') || '[]');
            localStorage.setItem('notices', JSON.stringify([...savedNotices, ...newNotices]));

            setNewNotices(prevNotices => prevNotices + newNotices.length);
            prevDevicesList.current = devicesList;
            setDevicesList(updatedList);
            setLastSynced(new Date());
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Layout>
            <div className="w-full">
                <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    position="absolute"
                    top={2}
                    right={2}
                >
                    {isLoading && (
                        <LinearProgress style={{ width: '100px', marginRight: '10px' }} />
                    )}
                    <IconButton
                        onClick={fetchData}
                        disabled={isLoading}
                        className="transition-transform duration-500 hover:rotate-360"
                    >
                        <FontAwesomeIcon icon={faArrowsRotate} className="h-5 w-5" />
                    </IconButton>

                    <Typography variant="subtitle2" align="right">
                        Last synced at: {lastSynced?.toLocaleString()}
                    </Typography>
                </Box>
                <BubbleChart data={Object.entries(devicesList).map(([name, deviceData]) => ({ name, value: deviceData.value }))} />
                <Grid container spacing={2} className="w-full">
                    {Object.entries(devicesList).map(([key, value]) => (
                        <Grid item xs={4} key={key} className={`bg-gradient-${value.state}`}>
                            <Device
                                name={value.name}
                                image={value.image}
                                state={value.state}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Layout>
    );
};

export default DevicesPage;
