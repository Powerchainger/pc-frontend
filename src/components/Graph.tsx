import React, { memo } from "react";
import { Line } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CategoryScale, Chart, LinearScale, LineElement, PointElement} from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

type GraphProps = {
    title: string;
    labels: string[];
    data: number[];
};

const Graph: React.FC<GraphProps> = memo(({ title, labels, data }) => {
    return (
        <div className="flex justify-center p-4 m-4 h-full w-full" style={{ maxHeight: '300px' }}>
            <Card className="shadow-md h-full w-full bg-gray-100">
                <CardContent>
                    <h4 className="text-center mb-4 text-2xl font-semibold text-blue-600">{title} 📊</h4>
                    <div style={{ height: '250px' }}>
                        <Line
                            datasetIdKey='id'
                            data={{
                                labels,
                                datasets: [
                                    {
                                        label: title,
                                        data,
                                        borderColor: '#CCCCFF',
                                        backgroundColor: 'rgba(255, 87, 51, 0.2)',
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    x: { grid: { display: false }},
                                    y: { grid: { display: true, color: '#ddd' }}
                                },
                            }}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
});

export default Graph;
