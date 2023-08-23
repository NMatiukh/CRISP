import React, {useState} from 'react';
import './Counter.scss';
import {Space} from "antd";

const Counter = () => {
    const [counterValue, setCounterValue] = useState(1);
    const plus = () => {
        setCounterValue(counterValue + 1)
    }
    const minus = () => {
        if (counterValue > 1) {
            setCounterValue(counterValue - 1)
        }
    }
    return (
        <div className={'counter'}>
            <button onClick={minus}>-</button>
            {
                counterValue
            }
            <button onClick={plus}>+</button>
        </div>
    );
};

export default Counter;