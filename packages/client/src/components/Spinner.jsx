/* eslint-disable react/prop-types */
import CircularProgress from "@mui/joy/CircularProgress";

const Spinner = (props) => {
    return (
        <>
            <div className="w-full min-h-[100px] flex items-center justify-center text-center">
                <CircularProgress
                    color="neutral"
                    determinate={false}
                    size={props.size || "md"}
                    variant="soft"
                    className={props.className || ""}
                />
            </div>
        </>
    );
};

const SpinnerSmall = (props) => {
    return (
        <>
            <div className="w-fit h-fit flex items-center justify-center text-center">
                <CircularProgress
                    color="neutral"
                    determinate={false}
                    size={props.size || "md"}
                    variant="soft"
                    className={props.className || ""}
                />
            </div>
        </>
    );
};

export { Spinner, SpinnerSmall };
