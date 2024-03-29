/* eslint-disable react/prop-types */
import { useRef } from "react";

const Search = (props) => {
    const searchRef = useRef();

    const handleInput = () => {
        if (props.onInput) {
            props.onInput(searchRef.current.value);
        }
    };

    const handleClick = () => {
        if (props.onClick) {
            props.onClick(searchRef.current.value);
        }
    };

    return (
        <div
            className={
                (props.className || "") +
                " border-[#000] rounded-[50px] w-[90%] m-[auto] box-border mt-[80px] flex align-middle overflow-hidden items-center bg-[white]"
            }
        >
            <input
                ref={searchRef}
                placeholder="Search"
                onInput={handleInput}
                className={
                    "bg-[transparent] text-[15px] mr-1 [font-family:'Poppins',Helvetica] outline-none w-full pl-3 h-[50px] bg-[white]"
                }
            />
            <i
                onClick={handleClick}
                className="fi fi-rs-search text-[20px] text-center h-[20px] m-2 mr-5 text-[grey]"
            ></i>
        </div>
    );
};

export default Search;
