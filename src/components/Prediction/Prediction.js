import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Prediction.css';

const Prediction = () => {

    const [data, setData ] = useState();

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await fetch(
                "http://shambuwu.com:8000/api/predict"
            ).then(r=> {return r.json()})

            setData(data)
            //readData()
        };

        dataFetch();
    }, []);


    const readData = () => {
        const aplianceData = data["per_appliance_score"]
        console.log(aplianceData)
    }

    return (
        <div>
            <div><h1>Hallo Kevin</h1></div>
            <div></div>
        </div>
    )
}

Prediction.propTypes = {};

Prediction.defaultProps = {};

export default Prediction;
