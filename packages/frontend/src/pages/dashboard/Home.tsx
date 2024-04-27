/** @format */
import {useEffect, useState} from "react";
import { Card } from "../../components/ui/card";
import { NavLink } from "react-router-dom";
import { getCookieData } from "../../services/storage";
import moment from "moment";
import { Skeleton } from "../../components/ui/skeleton";
import Chart from "../../components/chart";
import Query from "../../api/query";

function Home() {
  const [userData] = useState<any>(getCookieData("user"));
  const [productData, setProductData] = useState<any>([]);
  const [transactionData, setTransactionData] = useState<any>([]);
  const queryParamsArray = [
    {
      id: "products",
      url: "product/",
    },
    {
      id: "transactions",
      url: "user/transactions",
    },
  ];
  const { queries } = Query(queryParamsArray);
  useEffect(() => {
    console.log(queries[1].data, queries[0].data);
    if (queries[0].isSuccess) {
      setProductData(queries[0].data.message);
    }
    if (queries[1].isSuccess) {
      setTransactionData(queries[1].data.data);
    }
  }, [queries]);

  return (
    <div className='flex flex-col space-y-6'>
      <div className='grid md:grid-flow-col gap-4'>
        <div className='md:col-span-7 col-span-12'>
          <Card className='bg-no-repeat border rounded-xl mr-2 p-6'>
            <div>
              <p className='text-2xl text-indigo-900'>
                Welcome <br />
                <strong>
                  {userData?.name || <Skeleton className='h-4 w-full' />}
                </strong>
              </p>
              <span className='bg-black text-sm text-white inline-block rounded-full mt-12 px-8 py-2'>
                <strong>{moment().format("dddd Do MMMM, YYYY")}</strong>
              </span>
            </div>
          </Card>
        </div>
        <div className='md:col-span-5 col-span-12'>
          <Card className='rounded-xl mr-2 p-6'>
            <div>
              <p className='text-2xl text-indigo-900'>
                My Store <br />
                {queries[0].isLoading ? (
                  <>
                    <Skeleton className='h-4 w-full' />
                  </>
                ) : (
                  <>
                    <strong>{productData.length}</strong> items
                  </>
                )}
              </p>
              <NavLink
                to='/dashboard/shop'
                className='bg-black text-sm text-white hover:no-underline inline-block rounded-full mt-12 px-8 py-2'>
                <strong>Peep my store</strong>
              </NavLink>
            </div>
          </Card>
        </div>
      </div>

      <div className='grid md:grid-flow-col gap-4'>
        <div className='md:col-span-7 col-span-12'>
          <Card className='bg-no-repeat border rounded-xl mr-2 p-6'>
            <div>
              {queries[1].isLoading ? (
                <>
                  <Skeleton className='h-4 w-full' />
                </>
              ) : (
                <Chart data={transactionData} />
              )}
            </div>
          </Card>
        </div>
        <div className='md:col-span-5 col-span-12'>
          <Card className='rounded-xl mr-2 p-6'>
            <div>
              <p className='text-2xl text-indigo-900'>
                My Sales <br />
                {queries[1].isLoading ? (
                  <>
                    <Skeleton className='h-4 w-full' />
                  </>
                ) : (
                  <>
                    <strong>{transactionData.length}</strong> sales
                  </>
                )}
              </p>
              <NavLink
                to='/dashboard/orders'
                className='bg-black text-sm text-white hover:no-underline inline-block rounded-full mt-12 px-8 py-2'>
                <strong>Peep my sales</strong>
              </NavLink>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
