import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import get from "../utils/Get";
import { Spinner } from "./Spinner";
import ErrorReload from "./Error";
import { Avatar } from "@mui/material";
import moment from "moment";

const Transaction = () => {
    const [transactions, setTransactions] = useFetch();

    const loadTransaction = () => {
        const res = get.get("/customer/transactions");
        setTransactions(res);
    };

    const addCommas = (number) => {
        // Convert number to string
        let numStr = number.toString();

        // Split the string into parts before and after the decimal point (if any)
        let parts = numStr.split(".");

        // Add commas to the integer part
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // Rejoin the parts and return the result
        return parts.join(".");
    }

    useEffect(() => {
        loadTransaction();
    }, []);

    return (
        <div className="h-[180px] w-full overflow-auto">
            {transactions?.success?.data?.length === 0 ? (
                <div className="text-center h-full w-full flex justify-center items-center">
                    No transaction!
                </div>
            ) : (
                transactions?.success?.data?.map((tran, key) => (
                    <div
                        key={key}
                        className="flex justify-between items-center p-2"
                    >
                        <div className="flex items-center">
                            <Avatar
                                src={tran.item.images[0] || ""}
                                sx={{ bgcolor: "black" }}
                                className="bg-[black] mr-2"
                            />
                            <div>
                                <h2 className="font-bold text-[12px] [font-family:'Poppins']">
                                    {tran.item.name}
                                </h2>
                                <p className="text-[grey] text-[10px]">
                                    {moment(tran.createdAt).format(
                                        "h:mm a - MMM D, YYYY"
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <h2 className="(font-bold text-[12px] [font-family:'Poppins']">
                                ${addCommas(tran.amount)}
                            </h2>
                            <p
                                className={`text-[grey] text-[10px] ${
                                    tran.type === "PAID"
                                        ? "!text-[green]"
                                        : "!text-[red]"
                                }`}
                            >
                                {tran.type}
                            </p>
                        </div>
                    </div>
                ))
            )}
            {transactions.loading ? (
                <div className="h-full w-full flex justify-center items-center flex-col bg-[ghostwhite]">
                    <Spinner />
                    <h1 className="text-center text-[10px] text-[grey]">
                        Loading...
                    </h1>
                </div>
            ) : (
                ""
            )}
            {transactions.error ? (
                <div className="h-full w-full flex justify-center items-center flex-col bg-[ghostwhite]">
                    <ErrorReload
                        reload={loadTransaction}
                        message={transactions.error.message}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Transaction;
