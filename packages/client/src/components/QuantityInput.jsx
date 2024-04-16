/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const QuantityInput = (props) => {
    const [value, setValue] = useState(props.value || 0);

    const updateValue = (newValue) => {
        if (newValue <= props.min) {
            return setValue(props.min);
        }

        if (newValue <= 0) {
            return setValue(0);
        }

        if (newValue > props.max) {
            return setValue(props.max);
        }

        setValue(newValue);
    };

    useEffect(() => {
        if (props.onChange) {
            props.onChange(value);
        }
    }, [value]);

    return (
        <div
            className={`w-[60px] rounded-[5px] flex justify-evenly items-center bg-[${props.color}] text-white`}
        >
            <span
                className="cursor-pointer"
                onClick={() => {
                    updateValue(value - 1);
                }}
            >
                -
            </span>
            <span className="[font-family:'Poppins']">{value}</span>
            <span
                className="cursor-pointer"
                onClick={() => {
                    updateValue(value + 1);
                }}
            >
                +
            </span>
        </div>
    );
};

export default QuantityInput;
