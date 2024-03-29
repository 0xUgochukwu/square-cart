/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Sheet from "react-modal-sheet";
import ErrorReload from "../components/Error";
import useFetch from "../hooks/useFetch";

import Search from "../components/Search";

import axios from "../utils/Fetch";
import { useEffect, useState } from "react";
import { Avatar, Badge, Card } from "@mui/material";

import VerifiedIcon from "@mui/icons-material/Verified";
import { CircleFlag } from "react-circle-flags";
import countryCode from "country-code-lookup";
import { Link } from "react-router-dom";
import { TeamPill } from "./TeamCard";

const UserCard = (props) => {
    const { _id, name, username, picture, country, verified } = props.data;
    const addTitle = props.addTitle || "Invite";
    const selectBtn = props.selectBtn || "Invited!";
    const onChoose = props.onChoose;
    const [btnTitle, setBtnTitle] = useState(addTitle);

    const onSelect = (id) => {
        setBtnTitle(selectBtn);
        setTimeout(() => {
            setBtnTitle(addTitle);
        }, 1000);

        if (onChoose) {
            onChoose(id);
        }
    };

    return (
        <Card elevation={0} className="p-5 m-5 flex items-center">
            <div>
                <Badge
                    badgeContent={<VerifiedIcon sx={{ fontSize: "20px" }} />}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    invisible={!verified}
                >
                    <Avatar src={picture || ""} alt={name} />
                </Badge>
            </div>
            <div>
                <div className="flex items-center">
                    <h5 className="[font-family:'Montserrat',Helvetica] ml-5 text-[15px] font-bold">
                        {name}
                    </h5>
                    <CircleFlag
                        countryCode={(
                            countryCode.byCountry(country || "")?.iso2 || ""
                        ).toLowerCase()}
                        className="h-[15px] ml-2"
                    />
                </div>
                <div className="flex items-center">
                    <span className="[font-family:'Montserrat',Helvetica] ml-5 text-[15px] text-[grey] font-light">
                        @{username}
                    </span>
                </div>
            </div>
            <span
                className="[font-family:'Montserrat'] block text-center rounded-[30px] bg-[#35AE2B] w-fit h-fit p-[10px] px-[15px] text-[white] text-[12px] font-bold ml-auto"
                onClick={() => {
                    onSelect(_id);
                }}
            >
                {btnTitle}
            </span>
        </Card>
    );
};

const TeamCard = (props) => {
    const { creator, players, teamType, title, wins, likes, _id } = props.data;
    const addTitle = props.addTitle || "Join";
    const selectBtn = props.selectBtn || "Joining";
    const onChoose = props.onChoose;
    const [btnTitle, setBtnTitle] = useState(addTitle);

    const onSelect = (id) => {
        setBtnTitle(selectBtn);
        setTimeout(() => {
            setBtnTitle(addTitle);
        }, 1000);

        if (onChoose) {
            onChoose(id);
        }
    };

    const formatNumber = (number) => {
        if (!number) {
            return "0";
        }
        return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <Card
            elevation={0}
            className="p-5 m-5 flex justify-between !bg-slate-100"
        >
            <div className="flex flex-col items-start justify-evenly gap-[10px]">
                <div className="flex items-end">
                    <Badge
                        badgeContent={
                            <VerifiedIcon sx={{ fontSize: "20px" }} />
                        }
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        invisible={!creator.verified}
                    >
                        <Avatar src={creator.picture || ""} />
                    </Badge>
                </div>
                <div className="flex items-center mt-2">
                    <h5 className="[font-family:'Montserrat',Helvetica] text-[15px] font-bold">
                        {title}
                    </h5>
                    <CircleFlag
                        countryCode={(
                            countryCode.byCountry(creator.country || "")
                                ?.iso2 || ""
                        ).toLowerCase()}
                        className="h-[15px] ml-2"
                    />
                    <span className="ml-2 text-[white] bg-[black] rounded-[2px] text-[6px] h-[12px] leading-normal p-1 flex items-center capitalize">
                        <span>{teamType}</span>
                    </span>
                </div>
                <div className="flex">
                    <div className="text-[#242424B2] flex items-center justify-center mr-5">
                        <i className="fi fi-rs-trophy mr-2 leading-3"></i>
                        <span>{formatNumber(wins)}</span>
                    </div>
                    <div className="text-[#242424B2] flex items-center justify-center text-center">
                        <i className="fi fi-rs-heart mr-2 leading-3"></i>
                        <span>{formatNumber(likes)}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between">
                <TeamPill players={players} />
                <span
                    className="[font-family:'Montserrat'] block text-center rounded-[30px] bg-[#35AE2B] w-fit h-fit p-[10px] px-[25px] text-[white] text-[12px] font-bold ml-auto"
                    onClick={() => {
                        onSelect(_id);
                    }}
                >
                    {btnTitle}
                </span>
            </div>
        </Card>
    );
};

const ChooseUser = ({ addTitle, onChoose, open, close, type, excludes }) => {
    const [response, setFetch] = useFetch();
    excludes = excludes || [];
    type = type || "players";

    const fetchUsers = (search) => {
        const req = axios.get(
            `/team/players${search ? "?search=" + search : ""}`
        );
        setFetch(req);
    };

    const fetchMyTeams = (search) => {
        const req = axios.get(`/team/me${search ? "?search=" + search : ""}`);
        setFetch(req);
    };

    const onSearch = (value) => {
        if (type === "players") {
            fetchUsers(value);
        } else {
            fetchMyTeams(value);
        }
    };

    useEffect(() => {
        if (type === "players") {
            fetchUsers();
        } else {
            fetchMyTeams();
        }
    }, []);

    return (
        <>
            <div>
                <Sheet isOpen={open || false} onClose={close}>
                    <Sheet.Container>
                        <Sheet.Header />
                        <Sheet.Content>
                            <Search
                                onClick={onSearch}
                                onInput={onSearch}
                                className="!m-auto !my-2 bg-[ghostwhite]"
                            />

                            <div className="overflow-x-auto">
                                {!response.loading ? (
                                    response.success ? (
                                        response.success.data.map((each, key) =>
                                            excludes.includes(each._id) ? (
                                                ""
                                            ) : type == "players" ? (
                                                <UserCard
                                                    key={key}
                                                    data={each}
                                                    addTitle={addTitle}
                                                    onChoose={onChoose}
                                                />
                                            ) : (
                                                <TeamCard
                                                    key={key}
                                                    data={each}
                                                    addTitle={addTitle}
                                                    onChoose={onChoose}
                                                />
                                            )
                                        )
                                    ) : response.error ? (
                                        <ErrorReload
                                            message={response.error.message}
                                            reload={fetchUsers}
                                        />
                                    ) : (
                                        ""
                                    )
                                ) : (
                                    ""
                                )}
                            </div>
                        </Sheet.Content>
                    </Sheet.Container>
                    <Sheet.Backdrop />
                </Sheet>
            </div>
        </>
    );
};

export default ChooseUser;
