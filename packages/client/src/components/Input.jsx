/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import moment from "moment";

const Input = (props) => {
    const [type, setType] = useState(null);
    const minTime = moment().add(30, "minutes").format("YYYY-MM-DDTHH:mm");
    const maxTime = moment().add(30, "days").format("YYYY-MM-DDTHH:mm");

    useEffect(() => {
        if (props.type === "datetime-local" || props.type === "time") {
            return setType("text");
        }
        setType(props.type);
    }, [props.type]);

    const isFocused = (e) => {
        if (props.type === "datetime-local" || props.type === "time") {
            setType(props.type);
            setTimeout(() => {
                e.target.click();
            }, 100);
        }
    };

    const isBlurred = () => {
        if (props.type === "datetime-local" || props.type === "time") {
            setType("text");
        }
    };

    return (
        <>
            {props.type == "select" ? (
                <select
                    disabled={props.disabled || false}
                    defaultValue={props.placeholder}
                    onChange={props.onChange}
                    className={
                        props.className +
                        `${props.disabled ? " bg-[#F5F4F4]" : ""}` +
                        " pl-[20px] text-[#9B9B9B] bg-[#E5E1E1] h-[50px] w-[90%] m-auto rounded-[16px] border-solid border-[3px] focus:border-[#F5F4F4] border-[#F5F4F4] [font-family:'Montserrat'] text-[12px]"
                    }
                    ref={props.forwardedRef}
                >
                    <option disabled>{props.placeholder}</option>
                    {props.children}
                </select>
            ) : (
                <span className="flex ">
                    <input
                        type={type || props.type}
                        disabled={props.disabled || false}
                        placeholder={props.placeholder || "Aa"}
                        defaultValue={props.value}
                        ref={props.forwardedRef}
                        defaultChecked={
                            props.type == "checkbox" ? props.value : undefined
                        }
                        onChange={props.onChange}
                        onFocus={isFocused}
                        onBlur={isBlurred}
                        max={
                            props.type === "datetime-local"
                                ? maxTime
                                : undefined
                        }
                        min={
                            props.type === "datetime-local"
                                ? minTime
                                : undefined
                        }
                        className={
                            props.className +
                            " flex items-center gap-[10px] rounded-[16px] border-solid border-[3px] focus:border-[#F5F4F4] border-[#F5F4F4] [font-family:'Montserrat'] text-[12px] outline-none" +
                            `${props.disabled ? " bg-[#F5F4F4]" : ""}` +
                            `${
                                type === "checkbox"
                                    ? " m-2 ml-5 !rounded-[100%] accent-black"
                                    : type == "date" || type == "time"
                                    ? " pl-[20px] pr-[20px] h-[50px] w-[90%] m-auto"
                                    : " p-[20px] h-[15px] w-[90%] m-auto"
                            }`
                        }
                    />
                    <span className="flex items-center">
                        {props.type == "checkbox" ? (
                            <p className="[font-family:'Montserrat'] text-[12px]">
                                {props.placeholder}
                            </p>
                        ) : (
                            ""
                        )}
                    </span>
                </span>
            )}
        </>
    );
};

const Textarea = (props) => {
    return (
        <textarea
            type={props.type}
            disabled={props.disabled || false}
            placeholder={props.placeholder || "Aa"}
            defaultValue={props.value}
            onChange={props.onChange}
            className={
                props.className +
                `${props.disabled ? " bg-[#F5F4F4]" : ""}` +
                " resize-none flex items-center p-[20px] h-[150px] w-[90%] m-auto gap-[10px] rounded-[16px] border-solid border-[3px] focus:border-[#F5F4F4] border-[#F5F4F4] [font-family:'Montserrat'] text-[12px] outline-none"
            }
        ></textarea>
    );
};

const FilePicker = (props) => {
    const [title, setTitle] = useState(props.placeholder || "Choose a file");
    const fileUpload = () => {
        console.log("Upload file ...");
        const file = document.createElement("input");
        file.type = "file";
        file.onchange = () => {
            if (file.files.length > 0) {
                const uploaded = file.files[0];
                setTitle(uploaded.name);

                if (props.onChange) {
                    props.onChange(uploaded);
                }
            }
        };
        file.click();
    };

    return (
        <div
            className={
                props.className +
                `${props.disabled ? " bg-[#F5F4F4]" : ""}` +
                " resize-none flex items-center p-[20px] h-[50px] w-[90%] m-auto gap-[10px] rounded-[16px] border-solid border-[3px] focus:border-[#F5F4F4] border-[#F5F4F4] [font-family:'Montserrat'] text-[12px] text-[white] outline-none"
            }
            onClick={fileUpload}
        >
            <span className="fi fi-sr-file"></span>
            <span>{title}</span>
        </div>
    );
};

export { Input, Textarea, FilePicker };
