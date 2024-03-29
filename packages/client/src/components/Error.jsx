/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Card from "@mui/material/Card";

const ErrorReload = (props) => {
    const reload = () => {
        if (props.reload) {
            props.reload();
        } else {
            window.location.reload();
        }
    };
    return (
        <>
            <Card
                elevation={0}
                className="h-[100px] min-w-[90%] m-5 flex items-center justify-evenly flex-col"
            >
                <span className="text-[#626262B2] [font-family:'Montserrat']">
                    {props.message || "Something went wrong!"}
                </span>
                <span
                    className="ml-2 text-[#ff00008f] cursor-pointer [font-family:'Poppins']"
                    onClick={() => reload()}
                >
                    Reload
                </span>
            </Card>
        </>
    );
};

export default ErrorReload;
