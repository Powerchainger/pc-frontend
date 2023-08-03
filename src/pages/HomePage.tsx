import React from "react";
import Layout from "../components/Layout";
import Guide from "../components/Guide";
import {Grid} from "@mui/material";
import Graph from "../components/Graph";

export default function HomePage() {
    return (
        <Layout>
            <div className="flex justify-center absolute">
                <Guide  />
            </div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Graph />
                </Grid>
                <Grid item xs={6}>
                    <Graph />
                </Grid>
                <Grid item xs={6}>
                    <Graph />
                </Grid>
                <Grid item xs={6}>
                    <Graph />
                </Grid>
            </Grid>
        </Layout>
    )
}