import React from 'react';
import PropTypes from 'prop-types';
import CanvasJSReact from '@canvasjs/react-charts';
import './Chart.css';
import Papa from "papaparse"

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        data: []
    }
    render() {
        const { title = "Active watt usage last week"} = this.props
        const { xAxis = "time"} = this.props
        const { datapoints = [{ x: 1, y: 64 }, ]} = this.props
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            title:{
                text: title
            },
            axisY: {
                title: "Usage in Active Watt",
                suffix: "W"
            },
            axisX: {
                title: xAxis,
                suffix: ":00",
                interval: 2
            },
            data: [{
                type: "line",
                toolTipContent: "Week {x}: {y}",
                dataPoints: datapoints
            }]

        }

        return (
            <div className="chart">
                <CanvasJSChart options = {options}
                />
            </div>
        );


    }

}

Chart.propTypes = {};

Chart.defaultProps = {};

export default Chart;
