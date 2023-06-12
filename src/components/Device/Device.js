import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Device.css';
import styles from "./Device.module.css";

const Device = (props) => {

    const [on, seton] = useState(true);

    const toggleOn = () => {
        seton(!on);
    }

    useEffect(() => {
        if (on_off === 1) {
            toggleOn()
        }
    },[])

    const { name = "device"} = props
    const { on_off = "on"} = props

    return (
    <div className="Device" data-testid="Device">
        <div className={on_off}>your {name} is {on_off}</div>
    </div>
    )};

Device.propTypes = {};

Device.defaultProps = {};

export default Device;
