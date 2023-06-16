import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Prediction.css';

const Prediction = () => {

    const [data, setData ] = useState();

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await fetch(
                "http://shambuwu.com:8000/api/predictions?dataset=levi"
            ).then(r=> {return r.json()})
        };

        dataFetch();
    }, []);


    return (
        <div>
            <div></div>
            <div></div>
        </div>
    )
}

Prediction.propTypes = {};

Prediction.defaultProps = {};

export default Prediction;
