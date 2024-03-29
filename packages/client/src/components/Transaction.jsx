import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import get from "../utils/Get";
import { Spinner } from "./Spinner";
import ErrorReload from "./Error";

const Transaction = () => {
    const [transactions, setTransactions] = useFetch();

    const loadTransaction = () => {
        const res = get.get("/customer/transactions");
        setTransactions(res);
    };

    useEffect(() => {
        loadTransaction();
    }, []);

    return (
        <div className="h-full w-full">
            {transactions?.success?.data?.length === 0 ? (
                <div className="text-center h-full w-full flex justify-center items-center">
                    No transaction!
                </div>
            ) : (
                ""
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
