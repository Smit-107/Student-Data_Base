import React from 'react'

const StudentInformation = () => {
    return (
        <div className='flex flex-col mt-5'>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2'>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'> First Name</label>
                    <input type='text' id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='First Name ...' />
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'> Middel Name</label>
                    <input type='text' id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Middel Name ...' />
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'> Last Name</label>
                    <input type='text' id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Last Name ...' />
                </div>

            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2'>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Student Contact No.</label>
                    <input type='number' maxLength={10} id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Contact No ...' />
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Student No.</label>
                    <input type='number' maxLength={10} id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Whatsapp No ...' />
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Parent Contact No.</label>
                    <input type='number' maxLength={10} id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Contact No ...' />
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Parent No.</label>
                    <input type='number' maxLength={10} id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Whatsapp No ...' />
                </div>

            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2'>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Address</label>
                    <textarea name="name" id="name" cols="2" rows="2" className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Address ...'></textarea>
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'> Middel Name</label>
                    <input type='datetime-local' id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Middel Name ...' />
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'> Image</label>

                    <input type='file' id='name' className='border text-gray-400 rounded-md px-3 py-1.5 w-full' />
                </div>

            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2'>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Qualification</label>
                    <input type='text' id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Qualification ...' />
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'> Select Reference</label>
                    <select name="reference" id="reference" className='border rounded-md px-3 py-1.5 w-full' placeholder=' Select Reference ...'>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>

                <div className='p-2'>
                    <label htmlFor='name' className='block font-semibold mb-1 text-gray-600 text-sm'>Reference Name</label>
                    <input type='text' id='name' className='border rounded-md px-3 py-1.5 w-full' placeholder='Enter Reference Name ...' />
                </div>

            </div>

        </div>
    )
}

export default StudentInformation


