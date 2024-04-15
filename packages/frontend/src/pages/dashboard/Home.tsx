/** @format */

import { Card } from "../../components/ui/card";
import { Link } from "react-router-dom";
import { getCookieData } from "../../services/storage";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import moment from 'moment';

function Home() {
  const [userData] = useState<any>(getCookieData("user"));
  const [token] = useState<any>(getCookieData("token"));
  const { sendRequest } = useAxiosRequest<any>();
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return sendRequest("get", "product/", null, token);
    },
  });

  return (
    <div className='grid md:grid-flow-col gap-4'>
      <div className='md:col-span-7 col-span-12'>
        <Card className='bg-no-repeat border rounded-xl mr-2 p-6'>
          <div>
            <p className='text-2xl text-indigo-900'>
              Welcome <br />
              <strong>{userData?.name}</strong>
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
              <strong>
                {isLoading ? "fetching..." : data.message.length}
              </strong>{" "}
              items
            </p>
            <Link
              to='/dashboard/shop'
              className='bg-black text-sm text-white hover:no-underline inline-block rounded-full mt-12 px-8 py-2'>
              <strong>Peep my store</strong>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Home;
