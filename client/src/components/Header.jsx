import React from 'react'

function Header() {
    return (
        <div className='w-[100%] flex flex-col-reverse lg:flex-row gap-10 md:gap-6 justify-between px-10 md:px-48 py-24'>
            <div className='w-[100%] md:w-[50%] flex flex-col justify-center'>
                <p className='text-6xl font-serif font-semibold'>Learn for <span className='text-violet-500'>Coursera</span></p>
                <p className='text-lg font-serif mt-2'>View all professional courses.</p>
                <div className='mt-6'>
                    <a href='#courses'>
                        <button className='px-10 py-3 bg-violet-500 rounded-lg text-white font-serif font-bold'>View Courses</button>
                    </a>
                </div>
            </div>

            <div className='w-[100%] md:w-[50%]'>
                <img className='object-cover' src={require("../assets/headerImage.png")} alt='Header' />
            </div>
        </div>
    )
}

export default Header