import React, { useEffect, useState, useRef, useContext } from "react";
import Layout from "../components/Layout";
import {Grid, CircularProgress, Box, Typography, LinearProgress, Button} from "@mui/material";
import Device from "../components/Device";
import { getPredictions5m } from '../api/Api';
import { Notice } from '../components/types';
import NewNoticesContext from '../hooks/NewNoticesContext';
import BubbleChart from "../components/BubbleChart";
import { IconButton } from "@mui/material";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import device from "../components/Device";
import {local} from "d3";
import { toast } from 'react-toastify';


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
    const modelType = localStorage.getItem("selectedModel") || "fhmm";

    const fetchData = async () => {

        // @ts-ignore
        localStorage.setItem("sync", lastSynced?.toLocaleTimeString())

        setIsLoading(true);
        try {
            const dataset = "levi";
            const response = await getPredictions5m();

            if (!response || !response.data) {
                throw new Error("No response from server");
            }

            const data: ApiResponse = response.data;

            for (const [key] of Object.entries(data.images)) {
                localStorage.setItem("feedback " + key, "true")
            }

            const updatedList: Record<string, DeviceData> = {};

            let newNotices: Notice[] = [];

            Object.entries(data.device_states).forEach(([key, value]) => {
                updatedList[key] = {
                    image: data.images[key],
                    name: key,
                    state: value > 0 ? "on" : "off",
                    value: value,
                };

                if (value > 500 && (!prevDevicesList.current[key] || prevDevicesList.current[key].state !== "on")) {
                    newNotices.push({
                        device: key,
                        time: new Date().toLocaleString(),
                        wattage: value,
                        extra: `${key} has been identified as a high energy consumer. It is recommended to ensure ${key} is not operating during unintended periods.`
                    });
                }

                if (value > 1 && (!prevDevicesList.current[key] || prevDevicesList.current[key].state !== "on")) {
                    console.log(`Device ${key} is considered for toast:`, prevDevicesList.current[key]);
                    toast(`${key} has turned on!`);
                }
            });

            const dummyDevices: string[] = ["EV", "air conditioner", "washing machine", "quooker"]

            for (let i = 0; i <= 3; i++) {
                updatedList[dummyDevices[i]] = {
                    image: undefined,
                    name: dummyDevices[i],
                    state: "disabled",
                    value: 0,
                };
            }

            const savedNotices = JSON.parse(localStorage.getItem('notices') || '[]');
            localStorage.setItem('notices', JSON.stringify([...savedNotices, ...newNotices]));

            updatedList["test-device-1"] = {
                image: "path/to/test/image1.jpg",
                name: "Test Device 1",
                state: "on",
                value: 350,
            };

            updatedList["test-device-2"] = {
                image: "path/to/test/image2.jpg",
                name: "Test Device 2",
                state: "on",
                value: 15,
            };

            setNewNotices(prevNotices => prevNotices + newNotices.length);
            prevDevicesList.current = updatedList;
            setDevicesList(updatedList);
            setLastSynced(new Date());

        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setIsLoading(false);
        }

    };

    const addTestDevice = () => {
        prevDevicesList.current['test-device-3'] = {
            image: 'test-image-url',
            name: 'Test Device 3',
            state: 'off',
            value: 0,
        };

        setDevicesList((prevDevicesList) => ({
            ...prevDevicesList,
            'test-device-3': {
                image: 'test-image-url',
                name: 'Test Device',
                state: 'on',
                value: 250,
            },
        }));
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
                        <LinearProgress style={{ width: '100px', marginRight: '10px', marginLeft: '10px' }} />
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
                <BubbleChart data={Object.entries(devicesList).filter(([_, deviceData]) => deviceData.state === 'on').map(([name, deviceData]) => ({ name, value: deviceData.value }))} />
                <Typography variant="caption" mx={"15px"}>
                    Model: {modelType}
                </Typography>
                <div className="border-t border-gray-300 w-full my-2" />
                {/*<Button variant="contained" color="primary" onClick={addTestDevice}>*/}
                {/*    Add Test Device*/}
                {/*</Button>*/}

                <div className="max-h-[350px] overflow-y-scroll p-2 rounded-md relative">
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
            </div>
        </Layout>
    );
};

export default DevicesPage;
