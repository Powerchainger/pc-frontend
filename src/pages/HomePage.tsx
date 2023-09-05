import React from "react";
import Layout from "../components/Layout";
import Guide from "../components/Guide";
import { Grid } from "@mui/material";
import Graph from "../components/Graph";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function HomePage() {
    return (
        <Layout>
            <div className="hero-section text-white p-10 rounded-sm bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 bg-opacity-90 relative w-full">
                {/* Add an image */}
                <img src="/path/to/your/image.jpg" alt="Cool Background" className="absolute top-0 left-0 w-full h-full object-cover opacity-25" />

                <div>
                    <Typography variant="h4">
                        Welcome to Your Energy Dashboard
                    </Typography>
                </div>
                <div>
                    <Typography variant="h6">
                        Detect your appliances every minute for the last 5 minutes!
                    </Typography>
                </div>
            </div>

            <div className="flex justify-center">
                <Guide />
            </div>
        </Layout>
    );
}

