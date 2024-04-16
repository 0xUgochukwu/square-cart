/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import Badge from "@mui/material/Badge";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//     ({ theme, open }) => ({
//         flexGrow: 1,
//         padding: theme.spacing(3),
//         transition: theme.transitions.create("margin", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//         marginLeft: `-${drawerWidth}px`,
//         ...(open && {
//             transition: theme.transitions.create("margin", {
//                 easing: theme.transitions.easing.easeOut,
//                 duration: theme.transitions.duration.enteringScreen,
//             }),
//             marginLeft: 0,
//         }),
//     })
// );

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
    const [nameInitial, setNameInitial] = useState("");
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            try {
                let user = JSON.parse(localStorage.getItem("user"));
                setUserName(user.username);
                if (props.title) {
                    setUserName(props.title);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, [props]);

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAnchor = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const menuItems = [
        {
            name: "Chats",
            icon: "fi fi-sr-comment",
            link: "/dashboard",
        },
        {
            name: "Tokens",
            icon: "fi fi-sr-usd-circle",
            link: "/tokens",
        },
        {
            name: "Settings",
            icon: "fi fi-sr-settings",
            link: "/settings",
        },
    ];

    return (
        <Box sx={{ display: "flex", mb: 7 }}>
            <CssBaseline />
            <AppBar
                id="appbar"
                position="fixed"
                open={open}
                className="!bg-[#242424]"
            >
                <Toolbar
                    id="account-menu"
                    sx={{ background: "white", color: "black" }}
                    className="!bg-[#242424]"
                >
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            mr: 1,
                            ml: "1px",
                            ...(open && { display: "none" }),
                        }}
                    >
                        {/* <MenuIcon /> */}
                        {/* <i className="fi fi-rs-bars-staggered text-[30px] text-[black] h-[35px]"></i> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="16"
                            viewBox="0 0 20 16"
                            fill="none"
                        >
                            <path
                                d="M1.49992 0.916626H8.58325C8.95897 0.916626 9.31931 1.06588 9.58499 1.33156C9.85066 1.59723 9.99992 1.95757 9.99992 2.33329C9.99992 2.70902 9.85066 3.06935 9.58499 3.33503C9.31931 3.6007 8.95897 3.74996 8.58325 3.74996H1.49992C1.1242 3.74996 0.763861 3.6007 0.498184 3.33503C0.232507 3.06935 0.083252 2.70902 0.083252 2.33329C0.083252 1.95757 0.232507 1.59723 0.498184 1.33156C0.763861 1.06588 1.1242 0.916626 1.49992 0.916626ZM11.4166 12.25H18.4999C18.8756 12.25 19.236 12.3992 19.5017 12.6649C19.7673 12.9306 19.9166 13.2909 19.9166 13.6666C19.9166 14.0423 19.7673 14.4027 19.5017 14.6684C19.236 14.934 18.8756 15.0833 18.4999 15.0833H11.4166C11.0409 15.0833 10.6805 14.934 10.4149 14.6684C10.1492 14.4027 9.99992 14.0423 9.99992 13.6666C9.99992 13.2909 10.1492 12.9306 10.4149 12.6649C10.6805 12.3992 11.0409 12.25 11.4166 12.25ZM1.49992 6.58329H18.4999C18.8756 6.58329 19.236 6.73255 19.5017 6.99822C19.7673 7.2639 19.9166 7.62424 19.9166 7.99996C19.9166 8.37568 19.7673 8.73602 19.5017 9.00169C19.236 9.26737 18.8756 9.41663 18.4999 9.41663H1.49992C1.1242 9.41663 0.763861 9.26737 0.498184 9.00169C0.232507 8.73602 0.083252 8.37568 0.083252 7.99996C0.083252 7.62424 0.232507 7.2639 0.498184 6.99822C0.763861 6.73255 1.1242 6.58329 1.49992 6.58329Z"
                                fill="white"
                            />
                        </svg>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {props.title ? (
                            <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[normal]">
                                <span className="[font-family:'Poppins',Helvetica] font-normal text-[15px] tracking-[0]">
                                    {props.title}
                                </span>
                            </p>
                        ) : (
                            <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[normal]">
                                <span className="[font-family:'Poppins',Helvetica] font-normal text-[15px] tracking-[0]">
                                    Chatter
                                </span>
                                <span className="[font-family:'Poller_One',Helvetica]">
                                    AI
                                </span>
                            </p>
                        )}
                    </Typography>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            style={{ marginLeft: "auto" }}
                            aria-controls={
                                openAnchor ? "account-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={openAnchor ? "true" : undefined}
                        >
                            <Avatar
                                sx={{ width: 35, height: 35 }}
                                alt={nameInitial ? nameInitial : "User"}
                                src={""}
                            >
                                {(nameInitial || "").split("")[0]}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                open={openAnchor}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        bgcolor: "#242424",
                        color: "white",
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "#242424",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Link to="/tokens">
                    <MenuItem>
                        <Avatar src={""} /> My Account
                    </MenuItem>
                </Link>
                <Divider />
                <Link to="/settings">
                    <MenuItem>
                        <ListItemIcon>
                            <Settings
                                fontSize="small"
                                className="text-[white]"
                            />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                </Link>
                <MenuItem onClick={logOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" className="text-[white]" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        bgcolor: "#0e0e0e",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {" "}
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon className="text-[white]" />
                        ) : (
                            <ChevronRightIcon className="text-[white]" />
                        )}
                    </IconButton>
                </DrawerHeader>
                <List>
                    {menuItems.map((text, index) => (
                        <Link key={index} to={text.link}>
                            <ListItem
                                className={
                                    window.location.pathname === text.link
                                        ? "activeItem"
                                        : "notActiveItem"
                                }
                                sx={{
                                    background: "#F8F8FF",
                                    borderRadius: "30px",
                                    m: 2,
                                    width: "auto",
                                    height: "50px",
                                }}
                                onClick={handleDrawerClose}
                            >
                                <ListItemButton disableRipple>
                                    <ListItemIcon className="menuIcon">
                                        <i className={text.icon}></i>
                                    </ListItemIcon>
                                    <ListItemText
                                        className="menuText"
                                        primary={text.name}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <center className="mt-auto mb-[20px]">
                    <Avatar className="text-center mb-2" src={""} />
                    <span className="text-white">
                        {userName === "" ? "User" : userName}
                    </span>
                </center>
            </Drawer>
        </Box>
    );
}
