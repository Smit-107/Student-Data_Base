import React, { useState } from 'react'
import { BsFillPlusCircleFill, BsPlusCircle, BsTrash, IconName } from "react-icons/bs";

const CourseInformation = () => {

    const init = {
        Amount: '',
        Date: ''
    }

    let [task, settask] = useState(init);
    var [tdata, settdata] = useState([]);
    // var [editId, seteditId] = useState();
    // var [isEdit, setisEdit] = useState(false);

    var handleButtonClick = () => {
        // if (isEdit) {
        //   tdata[editId] = task;
        //   setisEdit(false);
        //   settask(init);
        // }
        // else {
        const updatedTdata = [...tdata, task];
        settdata(updatedTdata);
        settask(init);
        // }
    }

    // const handleEdit = (ind) => {

    //     seteditId(ind);
    //     setisEdit(true);
    //     settask(tdata[ind])
    //   }

    const handleDelete = (ind) => {
        const updatedData = tdata.filter((val, index) => index !== ind);
        settdata(updatedData);
    };

    var event = (nv) => {
        let task_name = (nv.target.name);
        let task_value = (nv.target.value);

        settask({ ...task, [task_name]: task_value });
        console.log(task);
    };



    return (
        <div className='flex flex-col mt-5 '>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2'>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Course</label>
                    <select name="reference" id="reference" class='border rounded-md px-3 py-1.5 w-full '>
                        <option value="" className='text-gray-400' disabled selected>Select Course...</option>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Course Duration</label>
                    <input type='text' id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Course Duration ...' />
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Daily Time</label>
                    <input type='text' id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Time ...' />
                </div>

            </div>

            <div className='p-2'>
                <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Course Contents</label>
                <textarea name="" id="" className='border rounded-md px-3 py-1.5 w-full' rows="2" placeholder='Enter Course Contents ...'></textarea>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2'>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Total Fees</label>
                    <input type='number' maxLength={10} id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Fees ...' />
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Joining Date</label>
                    <input type='date' id='name' className='border rounded-md px-3 py-1.5 w-full' />
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Ending Date</label>
                    <input type='date' id='name' className='border rounded-md px-3 py-1.5 w-full' />
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Laptop Compalsory</label>
                    <div className='border rounded-md px-3 py-1.5 w-full flex flex-row'>
                        <input type="radio" className='me-2' name="condition1" id="condition1" /><span className='text-gray-400 me-4'>Yes</span>
                        <input type="radio" className='me-2' name="condition1" id="condition1" /><span className='text-gray-400 '>No</span>
                    </div>
                </div>

            </div>

            <div className='mb-2'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <td colSpan={3}>
                                <div className='p-2'>
                                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Installment Details</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2 w-2/5'>
                                <input type='text' id='name' name='Amount' value={task.Amount} onChange={event} className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Installment Amount ...' />
                            </td>
                            <td className='p-2 w-2/5'>
                                <input type='date' id='name' name='Date'  placeholder='Select a date ...'  value={task.Date} onfocus="this.value=''" onChange={event} className='custom-date-input custom-date-input border rounded-md px-3 py-1.5 w-full ' />
                            </td>
                            <td className='p-2 w-1/5'>
                                <div onClick={handleButtonClick} className='border  border-indigo-600 w-1/3 rounded-md p-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white '><BsFillPlusCircleFill className='ms-0.5' /></div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tdata.map((data, id) => {
                                return (
                                    <tr>
                                        <td className='p-2 w-2/5'>
                                            <input type='text' id='name' className='border rounded-md px-3 py-1.5 w-full' value={data.Amount} placeholder='Enter Installment Amount ...' />
                                        </td>
                                        <td className='p-2 w-2/5'>
                                            <input type='date' id='name' value={data.Date} className='border rounded-md px-3 py-1.5 w-full ' />
                                        </td>
                                        <td className='p-2 w-1/5'>
                                            <div onClick={() => handleDelete(id)} className='border border-red-600 w-1/3 rounded-md p-4 py-2.5 bg-red-600 hover:bg-red-700 text-white '><BsTrash className='ms-0.5' /></div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default CourseInformation
