import React from 'react';
import { useSelector } from 'react-redux';

function Navbar() {

    const username = useSelector((state) => state.user.username);

    return (
        <div className='w-[100%] h-[10vh] px-4 md:px-10 bg-white flex justify-between items-center'>
            <p className='text-2xl font-serif font-bold uppercase'>Demo Cousera</p>

            <div className='w-12 h-12 rounded-full bg-gray-400 flex justify-center items-center'>
                <span className='font-serif text-xl text-white'>{username.charAt(0).toUpperCase()}</span>
            </div>
        </div>
    )
}

export default Navbar