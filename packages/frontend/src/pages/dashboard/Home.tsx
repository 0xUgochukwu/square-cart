import { Card } from "../../components/ui/card";
import { Link } from "react-router-dom";
import { getCookieData } from "../../services/storage";
import { useEffect, useState } from "react";


function Home() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const data = getCookieData("user");
    if (data) {
      setUserData(data);
    }
  }, []);

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
              <strong>01:51</strong>
            </span>
          </div>
        </Card>
      </div>
      <div className='md:col-span-5 col-span-12'>
        <Card className='rounded-xl mr-2 p-6'>
          <div>
            <p className='text-2xl text-indigo-900'>
              My Store <br />
              <strong>23</strong> items
            </p>
            <Link
              to=''
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
