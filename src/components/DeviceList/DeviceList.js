import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './DeviceList.css';

class DeviceList extends React.Component {

    constructor() {
        super();
        this.state = {devices: ["fridge", "pc", "airfryer", "electric heater","microwave", "kettle", "toaster","vacuum","monitor"]}
    }

    //fetch devices from backend instead of hardcode in line 10
    componentWillMount() {

    }

    render() {
        let devices = this.state.devices
        return (
            <div>
                <h4>registered devices</h4>
                <ul>
                {devices.map(device => <div className="device"><li>{device}</li></div>)}
                </ul>
            </div>
        )
    }

}
DeviceList.propTypes = {};

DeviceList.defaultProps = {};

export default DeviceList;
