import React from "react";
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement } from "chart.js";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function Graph() {
    return (
        <div className="flex justify-center p-4 m-4 h-full w-full">
            <Card className="shadow-md h-full w-full">
                <CardContent>
                    <Line
                        datasetIdKey='id'
                        data={{
                            labels: ['Jun', 'Jul', 'Aug'],
                            datasets: [
                                {
                                    label: '',
                                    data: [5, 6, 7],
                                },
                                {
                                    label: '',
                                    data: [3, 2, 1],
                                },
                            ],
                        }}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}