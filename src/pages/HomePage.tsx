import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import Guide from "../components/Guide";
import {Box, Grid, Chip} from "@mui/material";
import Graph from "../components/Graph";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { getMeasurements24h } from "../api/Api";
import { Line } from "react-chartjs-2";
import {CategoryScale, Chart, LinearScale, LineElement, PointElement} from "chart.js";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faNewspaper, faWind, faLightbulb} from "@fortawesome/free-solid-svg-icons";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

interface Measurement {
    timestamp: string;
    active_power: number;
}

export default function HomePage() {
    const [data, setData] = useState<Measurement[]>([]);
    const guideShown = localStorage.getItem("guideShown") === "true";
    const [showGuide, setShowGuide] = useState(!guideShown);

    useEffect(() => {
        getMeasurements24h("levi")
            .then((response) => {
                const fetchedData: Measurement[] = Object.values(response.data);
                setData(fetchedData);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const toggleGuide = () => {
        setShowGuide(!showGuide);
    };

    const downsampledData = data.filter((_, index) => index % 1000 === 0);

    const chartData = {
        labels: downsampledData.map((d) => d.timestamp), // Keep it as is
        datasets: [
            {
                label: "Active Power",
                data: downsampledData.map((d) => d.active_power),
                borderColor: "rgba(75,192,192,1)",
                fill: false,
                pointRadius: 0, // Remove dots
            },
        ],
    };

    const chartOptions = {
        interaction: {
            mode: undefined,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (HH:MM)'
                },
                ticks: {
                    maxTicksLimit: 10,
                    callback: function(value: any, index: any, values: any): string | number | null | undefined {
                        const actualTimestamp = downsampledData[index]?.timestamp;
                        if (actualTimestamp) {
                            return moment(actualTimestamp, 'YYYY-MM-DD HH:mm:ss').format('HH:mm');
                        }
                        return null;
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Active Power (W)'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        elements: {
            point: {
                radius: 0
            }
        },
        animation: {
            duration: 300
        },
    };

    return (
        <Layout>
            <div className="flex justify-between items-center bg-white p-6 rounded-b-lg shadow-md -mt-2 z-10">
                <div>
                    <Typography variant="h5" className="text-gray-800">
                        Welcome to Your Energy Dashboard
                    </Typography>
                    <Typography variant="body1" className="text-gray-600">
                        Detect your appliances every minute for the last 5 minutes!
                    </Typography>
                </div>
            </div>

            {showGuide && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Guide onClose={toggleGuide} forceShow={false} />
                </div>
            )}

            <div className="flex justify-center mt-10">
                <div className="bg-white shadow-md rounded-lg p-4 w-3/4">
                    <div className="flex justify-between items-center">
                        <Typography variant="h5">Last 24h of Energy Consumption</Typography>
                    </div>
                    <Line data={chartData} options={chartOptions} />
                    <Chip
                        label="This graph displays your active power consumption over the past 24 hours, sourced directly from your smart meter. This real-time data fuels our predictive models, enabling us to provide you with accurate device consumption forecasts!"
                        sx={{
                            height: 'auto',
                            '& .MuiChip-label': {
                                display: 'block',
                                whiteSpace: 'normal',
                            },
                        }}
                        variant="filled"
                        size="medium"
                        className="rounded-t-lg shadow-md bg-blue-600 text-white p-2"
                    />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 w-1/4 ml-4">
                    <Typography variant="h5" className="mb-4 text-center">Energy News & Tips</Typography>
                    <div className="flex items-center mb-2">
                        <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
                        <a href="#" className="text-blue-500 hover:underline">How to Save Energy in the Summer</a>
                    </div>
                    <hr className="my-2" />
                    <div className="flex items-center mb-2">
                        <FontAwesomeIcon icon={faWind} className="mr-2" />
                        <a href="#" className="text-blue-500 hover:underline">The Future of Renewable Energy</a>
                    </div>
                    <hr className="my-2" />
                    <div className="flex items-center mb-4">
                        <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                        <a href="#" className="text-blue-500 hover:underline">Did You Know? Turning off lights saves...</a>
                    </div>
                    <hr className="my-2" />
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <Typography variant="h6" className="text-center">Fun Fact: A single wind turbine can power 1400 homes  </Typography>
                        <Typography variant="body2">
                            Wind turbines are lauded as an energy source of the future, with the enormous wings of a 2.5MW turbine generating enough electricity to power 1400 homes.
                            This is enough to boil hundreds of thousands of kettles and make 230 million cups of tea, or power a household computer for more than 2000 years.
                        </Typography>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

