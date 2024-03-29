/* eslint-disable react/prop-types */
export const Button = ({ className, text, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className={`cursor-pointer bg-white text-black pl-[20px] pr-[20px] h-[50px] w-[90%] m-auto items-center gap-[10px] rounded-[16px] border-solid border-[3px] focus:border-[#F5F4F4] border-[#F5F4F4] [font-family:'Montserrat'] text-[12px] outline-none ${className}`}
        >
            {children}
            {text}
        </button>
    );
};

export const ButtonWrapper = ({ className, text = "LOGIN" }) => {
    return (
        <button
            className={`relative w-[107px] h-[13px] all-[unset] box-border ${className}`}
        >
            <span className="absolute w-[107px] -top-px left-0 [font-family:'Roboto',Helvetica] font-bold text-black text-[11px] text-center tracking-[0] leading-[normal] all-[unset] box-border">
                {text}
            </span>
        </button>
    );
};
