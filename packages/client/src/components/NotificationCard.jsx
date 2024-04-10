/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import VerifiedIcon from "@mui/icons-material/Verified";
import { CircleFlag } from "react-circle-flags";
import countryCode from "country-code-lookup";
import moment from "moment";

const handleNotification = (data) => {
    console.log({ data });
};

const NotificationCard = (props) => {
    const { _id, title, body, picture, link, action, from, createdAt } =
        props.data;

    const formatTime = moment(createdAt).format("MMM Do, yyyy - h:ma");

    const navigate = useNavigate();

    return (
        <Link to={link || "/notification/" + _id}>
            <Card elevation={0} className="p-5 m-5 flex">
                <div>
                    <Badge
                        badgeContent={
                            <VerifiedIcon sx={{ fontSize: "20px" }} />
                        }
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        invisible={!from?.verified}
                    >
                        <Avatar src={from?.picture || picture || ""} />
                    </Badge>
                </div>
                <div>
                    <div className="flex items-center overflow-hidden">
                        <h5 className="[font-family:'Montserrat',Helvetica] ml-5 text-[15px] font-bold">
                            {title}
                        </h5>
                        {/* <CircleFlag
                        countryCode={(
                            countryCode.byCountry(from?.country || "")?.iso2 ||
                            ""
                        ).toLowerCase()}
                        className="h-[15px] ml-2"
                    /> */}
                    </div>
                    <div className="flex items-center">
                        <span className="[font-family:'Montserrat',Helvetica] ml-5 text-[15px] text-[grey] font-light">
                            {"@" + from?.username || "Anonymous"}
                        </span>
                    </div>
                    <div className="flex text-[#626262B2] mt-2 self-start ml-5">
                        <span className="text-[10px]">
                            {body.substr(0, 20)} ...
                        </span>
                    </div>
                </div>
                {action ? (
                    <span
                        className="capitalize [font-family:'Montserrat'] block text-center rounded-[30px] bg-[#35AE2B] w-fit h-fit p-[10px] px-[25px] text-[white] text-[12px] font-bold ml-auto self-center"
                        onClick={() => {
                            navigate(link);
                        }}
                    >
                        {action}
                    </span>
                ) : (
                    ""
                )}
            </Card>
        </Link>
    );
};

const TournamentCardSkeleton = () => {
    return (
        <Card elevation={0} className="p-5 m-5 flex">
            <div>
                <Skeleton variant="circular">
                    <Avatar />
                </Skeleton>
            </div>
            <div className="ml-5">
                <div className="flex items-center">
                    <Skeleton variant="text" width={200} />
                    <Skeleton
                        className="ml-2"
                        variant="circular"
                        width={15}
                        height={15}
                    />
                </div>
                <div className="flex items-center">
                    <Skeleton variant="text" width={150} />
                    <Skeleton className="ml-2" variant="text" width={50} />
                </div>
                <div className="flex items-center text-[#626262B2] mt-2">
                    <Skeleton variant="text" width={200} />
                </div>
            </div>
        </Card>
    );
};

export { NotificationCard, TournamentCardSkeleton };
