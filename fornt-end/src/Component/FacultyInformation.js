import React from 'react'

const FacultyInformation = () => {
    return (
            <div className='flex flex-col mt-5 '>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2'>

                    <div className='p-2'>
                        <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Select Faculty</label>
                        <select name="reference" id="reference" className='border rounded-md px-3 py-1.5 w-full' placeholder='Select Faculty ...'>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>

                    <div className='p-2'>
                        <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Batch time</label>
                        <select name="reference" id="reference" className='border rounded-md px-3 py-1.5 w-full' placeholder='Select Batch Time ...'>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>

                    <div className='p-2'>
                        <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Running Topic</label>
                        <input type='text' id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Running ...' />
                    </div>

                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2'>

                    <div className='p-2'>
                        <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Laptop Compalsory</label>
                        {/* <input type='text' id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Running ...' /> */}
                        <div className='border rounded-md px-3 py-1.5 w-full flex flex-row'>
                            <input type="radio" className='me-2' name="condition1" id="condition1" /><span className='me-5'>Yes</span>
                            <input type="radio" className='me-2' name="condition1" id="condition1" /><span>No</span>
                        </div>
                    </div>

                    <div className='p-2'>
                        <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>PC No.</label>
                        <select name="reference" id="reference" className='border rounded-md px-3 py-1.5 w-full' placeholder='Select PC No ...'>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>

                    <div className='p-2'>
                        <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Laptop Compalsory</label>
                        {/* <input type='text' id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Running ...' /> */}
                        <div className='border rounded-md px-3 py-1.5 w-full flex flex-row'>
                            <input type="radio" className='me-2' name="condition2" id="condition1" /><span className='me-5'>Yes</span>
                            <input type="radio" className='me-2' name="condition2" id="condition1" /><span>No</span>
                        </div>
                    </div>

                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Extra Note</label>
                    <textarea name="" id="" className='border rounded-md px-3 py-1.5 w-full' rows="2"></textarea>
                </div>

                <div className='p-2 '>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Reception Note</label>
                    <textarea name="" id="" className='border rounded-md px-3 py-1.5 w-full focus:border-indigo-600' rows="2"></textarea>
                </div>

                

                <div className='text-center'>
                <input type='submit' id='name' className='bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-1.5' />

                </div>

            </div>
    )
}

export default FacultyInformation
