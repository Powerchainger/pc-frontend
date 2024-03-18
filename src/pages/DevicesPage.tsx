import React, {useEffect, useState, useRef, useContext} from "react";
import Layout from "../components/Layout";
import {Grid, CircularProgress, Box, Typography, LinearProgress, Button} from "@mui/material";
import Device from "../components/Device";
import {getPredictions5m} from '../api/Api';
import {Notice} from '../components/types';
import NewNoticesContext from '../hooks/NewNoticesContext';
import BubbleChart from "../components/BubbleChart";
import {IconButton} from "@mui/material";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import device from "../components/Device";
import {local} from "d3";
import {toast} from 'react-toastify';


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
    const {setNewNotices} = context;
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

                if (value > 700 && (!prevDevicesList.current[key] || prevDevicesList.current[key].state !== "on")) {
                    newNotices.push({
                        device: key,
                        time: new Date().toLocaleString(),
                        wattage: value,
                        extra: `${key} has been identified as a high energy consumer. It is recommended to ensure ${key} is not operating during unintended periods.`
                    });
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
            localStorage.setItem('cachedDevicesList', JSON.stringify(updatedList));
            localStorage.setItem('cachedLastSynced', JSON.stringify(new Date()));

            prevDevicesList.current = updatedList;
            setDevicesList(updatedList);
            setLastSynced(new Date());

        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        const cachedDevicesList = localStorage.getItem('cachedDevicesList');
        const cachedLastSynced = localStorage.getItem('cachedLastSynced');

        if (cachedDevicesList && cachedLastSynced) {
            setDevicesList(JSON.parse(cachedDevicesList));
            setLastSynced(new Date(JSON.parse(cachedLastSynced)));
        }

        fetchData();
        const intervalId = setInterval(fetchData, 60 * 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Layout>
            <div className="w-full">
                <BubbleChart
                    data={Object.entries(devicesList).filter(([_, deviceData]) => deviceData.state === 'on').map(([name, deviceData]) => ({
                        name,
                        value: deviceData.value
                    }))}/>
                <Typography variant="caption" mx={"15px"}>
                    Model: {modelType}
                </Typography>
                <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    top={2}
                    right={2}
                >
                    <Typography variant="caption" mx={"15px"}>
                        Last synced at: {lastSynced?.toLocaleString()}
                    </Typography>
                    {isLoading && (
                        <LinearProgress style={{width: '100px', marginRight: '10px', marginLeft: '10px'}}/>
                    )}
                    <IconButton
                        onClick={fetchData}
                        disabled={isLoading}
                        className="transition-transform duration-500 hover:rotate-360"
                    >
                        <FontAwesomeIcon icon={faArrowsRotate} className="h-5 w-5"/>
                    </IconButton>
                </Box>
                <div className="border-t border-gray-300 w-full my-2"/>
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
