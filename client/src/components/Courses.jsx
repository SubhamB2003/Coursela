/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../state';
import Course from './Course';

function Courses() {

    const [search, setSearch] = useState("");

    const dispatch = useDispatch();
    let courses = useSelector((state) => state.courses);

    const handleGetCourses = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}/course`);
        dispatch(setCourses({ courses: res.data }));
        console.log(res.data);
    }

    const handleSearch = () => {
        if (search !== "") {
            dispatch(
                setCourses({
                    courses: courses.filter((course) => course.name.toLowerCase().includes(search.toLowerCase()) ||
                        course.instructor.toLowerCase().includes(search.toLowerCase()))
                }));
        }
    }


    useEffect(() => {
        if (search === "") {
            handleGetCourses();
        }
    }, [search]);

    return (
        <div className='px-10 md:px-48 py-24' id='courses'>
            <div className='flex flex-col md:flex-row justify-between items-center pb-10 space-y-4 md:space-y-0'>
                <p className='text-3xl md:text-5xl font-semibold font-serif text-center'>All Courses</p>

                <div className='w-full xl:w-[30%] flex'>
                    <input placeholder='Search courses by name or author' value={search} onChange={(e) => setSearch(e.target.value)}
                        className='px-4 py-2.5 w-full rounded-l-lg appearance-none focus:outline-none font-serif' />
                    <button onClick={() => handleSearch()}
                        className='font-serif text-lg bg-violet-500 rounded-r-lg text-white px-4 py-2.5 cursor-pointer'>Search</button>
                </div>
            </div>

            <div className='w-[100%] flex flex-wrap gap-14'>
                {courses?.map((course, i) =>
                    <Course course={course} i={i} />
                )}
            </div>
        </div >
    )
}

export default Courses