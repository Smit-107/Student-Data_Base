import React from 'react'
import { IoStatsChart } from "react-icons/io5";
import { BsFillArrowRightCircleFill, BsHandbag } from "react-icons/bs";
import { FaChartPie, FaUserPlus } from 'react-icons/fa6';



const Dashboard = () => {
  return (
    <div className="bg-gray-100" style={{ height: `calc(100vh - 58.1px)` }}>
      <div className='px-2 py-4 flex flex_col justify-between items-center'>
        <div className='sm:w-1/2 sm:px-3 px-1 text-28 font-medium'>Dashboard</div>
        <div className='sm:w-1/2 sm:px-3 px-1 text-end text text-gray-500'><span className='text-blue-600'>Home</span> / <span> Dashboard</span></div>

      </div>
      <div className='px-2 flex flex-wrap w-full'>

        <div className='px-2 lg:w-1/4 w-1/2 text-white ' >
          <div className='mb-5  rounded-md relative hover-icon-4 md:text-left text-center' style={{ backgroundColor: '#17A2B8' }}>
            <div style={{ padding: '10px' }}>
              <h3 className='text-3xl mb-2 font-bold'>150</h3>

              <p className='pb-4 sm:text-base text-xs'>New Order</p>
            </div>
            <div style={{ fontSize: '50px' }}>
              <span className='absolute right-4 top-7'><BsHandbag className='icon11 md:opacity-100 opacity-0' style={{ color: 'rgba(0,0,0,.15)', transition: 'transform 0.3s' }} /></span>
            </div>
            <div style={{ backgroundColor: 'rgba(0,0,0,.1)' }} className='py-1 justify-center flex items-center rounded-b-md foot-1 ' >
              More info
              <BsFillArrowRightCircleFill className='ms-2' />
            </div>
          </div>
        </div>

        <div className='px-2 lg:w-1/4 w-1/2 text-white ' >
          <div className=' mb-5 rounded-md relative hover-icon-4 md:text-left text-center' style={{ backgroundColor: '#28A745' }}>
            <div style={{ padding: '10px' }}>
              <h3 className='text-3xl mb-2 font-bold'>53 <sup className='-ms-2 mt-1 text-xl'>%</sup></h3>

              <p className='pb-4 sm:text-base text-xs'>Bounce Rate</p>
            </div>
            <div className='' style={{ fontSize: '50px' }}>
              <span className='absolute right-4 top-7'><IoStatsChart className='icon11 md:opacity-100 opacity-0' style={{ color: 'rgba(0,0,0,.15)', transition: 'transform 0.3s' }} /></span>
            </div>
            <div className='py-1 justify-center flex items-center rounded-b-md foot-1' style={{ backgroundColor: 'rgba(0,0,0,.1)' }}>
              More info
              <BsFillArrowRightCircleFill className='ms-2' />
            </div>
          </div>
        </div>

        <div className='px-2 lg:w-1/4 w-1/2 text-black ' >
          <div className=' mb-5 rounded-md relative hover-icon-4 md:text-left text-center' style={{ backgroundColor: '#FFC107' }}>
            <div style={{ padding: '10px' }}>
              <h3 className='text-3xl mb-2 font-bold'>44</h3>

              <p className='pb-4 sm:text-base text-xs'>User Registrations</p>
            </div>
            <div className='' style={{ fontSize: '50px' }}>
              <span className='absolute right-4 top-7'><FaUserPlus className='icon11 md:opacity-100 opacity-0' style={{ color: 'rgba(0,0,0,.15)', transition: 'transform 0.3s' }} /></span>
            </div>
            <div className='py-1 justify-center flex items-center rounded-b-md foot-1' style={{ backgroundColor: 'rgba(0,0,0,.1)' }}>
              More info
              <BsFillArrowRightCircleFill className='ms-2' />
            </div>
          </div>
        </div>

        <div className='px-2 lg:w-1/4 w-1/2 text-white ' >
          <div className=' mb-5 rounded-md relative hover-icon-4 md:text-left text-center' style={{ backgroundColor: '#DC3545' }}>
            <div style={{ padding: '10px' }}>
              <h3 className='text-3xl mb-2 font-bold'>65</h3>

              <p className='pb-4 sm:text-base text-xs'>Unique Visitors</p>
            </div>
            <div className='' style={{ fontSize: '50px' }}>
              <span className='absolute right-4 top-7'><FaChartPie className='icon11 md:opacity-100 opacity-0' style={{ color: 'rgba(0,0,0,.15)', transition: 'transform 0.3s' }} /></span>
            </div>
            <div className='py-1 justify-center flex items-center rounded-b-md foot-1' style={{ backgroundColor: 'rgba(0,0,0,.1)' }}>
              More info
              <BsFillArrowRightCircleFill className='ms-2' />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
