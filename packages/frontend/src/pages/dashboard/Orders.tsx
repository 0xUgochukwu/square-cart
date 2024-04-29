/** @format */
import { useState, useEffect } from "react";
import { columns } from "../../utils/table/orders/columns";
import { DataTable } from "../../components/ui/data-table";
import { getCookieData } from "../../services/storage";
import Loading from "../../components/table-skeleton";
import Query from "../../api/query";

const Orders = () => {
  const [token, setToken] = useState<string>("");

  const queryParamsArray = [
    {
      id: "transactions",
      url: "user/transactions",
    },
  ];

  const { queries, handleDataUpdate } = Query(queryParamsArray);

  useEffect(() => {
    const tokenData = getCookieData("token");
    if (tokenData) {
      setToken(tokenData);
    }
  }, [token]);

  return (
    <>
      <div className='w-full flex justify-start py-4 px-3'>
        <p className=' text-xl'>All Orders</p>
      </div>
      {queries[0].isLoading ? (
        <Loading />
      ) : (
        <div className='w-full overflow-x-scroll bg-white p-4 rounded-xl'>
          <DataTable
            columns={columns}
            data={queries[0].data.data}
            onDataUpdate={handleDataUpdate}
          />
        </div>
      )}
    </>
  );
};

export default Orders;
