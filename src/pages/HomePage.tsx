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
            <div className="hero-section bg-blue-600 text-white p-10 rounded-sm bg-opacity-75">
                <Typography variant="h4">
                    Welcome to Your Energy Dashboard
                </Typography>
                <Typography variant="h6">
                    Manage and monitor all your energy statistics in real-time.
                </Typography>
            </div>

            <div className="flex justify-center absolute">
                <Guide />
            </div>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper elevation={3}>
                        <div className="max-h-[600px] max-w-[100%] overflow-hidden flex justify-center items-center">
                            <Graph title="24h Consumption" labels={['00:00', '06:00', '12:00', '18:00']} data={[5, 15, 10, 7]} />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3}>
                        <div className="max-h-[600px] max-w-[100%] overflow-hidden flex justify-center items-center">
                            <Graph title="Gas Usage" labels={['Jan', 'Feb', 'Mar']} data={[50, 60, 75]} />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3}>
                        <div className="max-h-[600px] max-w-[100%] overflow-hidden flex justify-center items-center">
                            <Graph title="Solar Power Import" labels={['Q1', 'Q2', 'Q3']} data={[200, 220, 240]} />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3}>
                        <div className="max-h-[600px] max-w-[100%] overflow-hidden flex justify-center items-center">
                            <Graph title="Solar Power Export" labels={['Q1', 'Q2', 'Q3']} data={[100, 90, 85]} />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
}
