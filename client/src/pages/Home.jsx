import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Courses from '../components/Courses';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { setCourses } from '../state';

function Home() {

    const dispatch = useDispatch();
    const handleGetCourses = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}/course`);
        dispatch(setCourses({ courses: res.data }));
    }

    useEffect(() => {
        handleGetCourses();
    }, []);

    return (
        <>
            <Navbar />

            <div className='bg-gray-100'>
                <Header />

                <div className='h-52 bg-violet-400 px-4 md:px-48 py-10 flex flex-wrap'>
                    <div className='w-[50%] border-r-2 border-r-white flex flex-col justify-center items-center'>
                        <p className='font-serif text-4xl md:text-7xl font-semibold text-white'>500+ </p>
                        <p className='font-serif text-xl md:text-4xl font-semibold text-white mt-6'>Courses</p>
                    </div>
                    <div className='w-[50%] flex flex-col justify-center items-center'>
                        <p className='font-serif text-4xl md:text-7xl font-semibold text-white'>1000+ </p>
                        <p className='font-serif text-xl md:text-4xl font-semibold text-white mt-6'>Students</p>
                    </div>
                </div>

                <Courses />
            </div>
        </>
    )
}

export default Home