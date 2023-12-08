import React from 'react'
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { ImCopy } from "react-icons/im";

const ViewUser = () => {

  const demo = [
    
    {
      name: 'Smit',
      Password: 1234,
    }
  ]

  return (
    <div className='bg-gray-100 '>
      <div className="px-2 py-4 bg-gray-100 flex flex_col justify-between items-center">
          <h2 className="sm:w-1/2 text-name sm:px-3 px-1 text-gray-800 text-2xl font-bold">
          View User 
          </h2>
          <div className="sm:w-1/2 text-name-all sm:px-3 px-1 text-end text text-gray-500">
            <span className="text-blue-600">Home</span> /
            <span> Manage User</span> <span>/</span>
            <span> View User</span> 
          </div>
        </div>
      <div className='lg:px-12 sm:p-4  p-3  md:px-8'>
        <div style={{ boxShadow: '0px 0px 20px #D9D9DB' }} className='form-height overflow-auto custom-scrollbar rounded-xl '>
          <div className=''>
            <table className='w-full bg-white border border-gray-200  '>
              <thead className='mt-1 uppercase text-sm leading-normal w-full '>
                <tr className='sticky top-0 bg-gray-100 text-gray-600'>
                  <th className='py-3 px-6 border-y text-left w-1/12'>no.</th>
                  <th className='py-3 px-6 border-y text-left w-2/5'>name</th>
                  <th className='py-3 px-6 border-y text-left w-1/4'>password</th>
                  <th className='py-3 px-6 border-y text-left w-1/4'>Actions</th>
                </tr>
              </thead>
              <tbody className='text-gray-900 text-sm font-light text'>
                {demo.map((val, id) => {
                  return (
                    <tr key={id} className='border-b border-gray-200 hover:text-black hover:bg-gray-100 w-full'>
                      <td className='py-3 px-6 text-left whitespace-nowrap  w-1/12'>{id + 1}</td>
                      <td className='py-3 px-6 text-left whitespace-nowrap w-2/5'>{val.name}</td>
                      <td className='py-3 px-6 text-left  w-1/4'>{val.Password}</td>
                      <td className='py-3 px-6 text-left w-1/4'>
                        <span className='flex'>
                          <BsPencilSquare className='text-blue-500 font-bold hover:text-blue-700 me-3 cursor-pointer' />
                          <BsTrash className='text-red-500 font-bold hover:text-red-700 me-3 cursor-pointer' />
                          <ImCopy className='text-green-600 font-bold hover:text-green-800 cursor-pointer' />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewUser
