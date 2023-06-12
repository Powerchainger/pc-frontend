import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './DeviceChart.css';
import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const url = "http://shambuwu.com:8000/api/predictions?dataset=kevin"
var chartData = []
const DeviceChart = (props) => {

    const [deviceData, setDeviceData] = useState("")

    useEffect(() => {
        fetch(url)
            .then(response => {
                return response.json()

            }
        ).then(data => {
            const deviceData = data[props.device]
            const convertedData = []
            for (let key in deviceData) {
                var data = {x:"",y:""}
                data.x = new Date(key*1)
                data.y = deviceData[key]
                convertedData.push(data)
            }

            setDeviceData(convertedData)
            console.log(convertedData)
        })
    }, [])


    const options = {
        animationEnabled: true,
        exportEnabled:true,
        title:{
            text: props.device
        },
        axisY: {
            title: "Usage in Watt",
            includeZero:true
        },
        axisX:{
            xValueType: "dateTime",
        },
        data:[{
            type:"stepArea",
            xValueFormatString: "H",
            dataPoints: deviceData
        }]
    }

    return (
  <div className="DeviceChart" data-testid="DeviceChart">
        {<CanvasJSChart options = {options}></CanvasJSChart>}
  </div>
)};

DeviceChart.propTypes = {};

DeviceChart.defaultProps = {};

export default DeviceChart;
