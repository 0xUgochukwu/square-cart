/* eslint-disable react/prop-types */
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const AppFab = (props) => {
    const handle = () => {};

    const fabStyle = {
        position: "fixed",
        bottom: 16,
        right: 16,
        background: "#0e0e0e",
    };

    return (
        <>
            <Fab
                size="large"
                aria-label="add"
                onClick={props?.onClick || handle}
                sx={fabStyle}
            >
                {props.children || <AddIcon sx={{ color: "white" }} />}
            </Fab>
        </>
    );
};

export default AppFab;
