/** @format */

import Layout from "./Layout";
import Navbar from "../../components/navbar";
import TopBar from "../../components/topbar";
import { Card } from "../../components/ui/card";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Layout>
      <TopBar />
      <div className='px-10 grid md:grid-flow-col md:auto-cols-max md:grid-cols-3 gap-4'>
        <div className='col-auto'>
          <Navbar />
        </div>
        <div className='col-span-10'>
          <Card className='bg-no-repeat border rounded-xl mr-2 p-6'>
            <div>
              <p className='text-5xl text-indigo-900'>
                Welcome <br />
                <strong>Lorem Ipsum</strong>
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
              <p className='text-5xl text-indigo-900'>
                Orders <br />
                <strong>23</strong>
              </p>
              <Link
                to=''
                className='bg-black text-sm text-white hover:no-underline inline-block rounded-full mt-12 px-8 py-2'>
                <strong>View order history</strong>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
