/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setUser } from '../state';

function SingleCourse() {

    const { courseId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const user = useSelector((state) => state.user);
    const userId = user._id;

    const courseExist = Boolean(user?.courses[courseId]);

    const handleEnroll = async () => {
        const res = await axios.patch(`${process.env.REACT_APP_URL}/user/enroll`, { courseId, userId });
        const user = res.data;
        console.log(res.data);
        if (res.status === 200) {
            dispatch(setUser(user));
        }
    }

    const handleGetCourse = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}/course/${courseId}`);
        if (res.status === 200) {
            setCourse(res.data);
        }
    }

    useEffect(() => {
        handleGetCourse();
    }, []);

    return (
        course !== null ?
            <div className='flex flex-col justify-center items-center py-20 px-4'>
                <div className='w-[100%] md:w-[40%] flex justify-start mb-8'>
                    <button className='px-14 py-2.5 bg-violet-500 rounded-lg text-white font-semibold font-serif'
                        onClick={() => navigate('/')}>Back</button>
                </div>
                <div className='w-[100%] md:w-[40%] border shadow-2xl bg-white rounded-md p-4 cursor-pointer'>
                    <img className='w-full h-60 object-cover rounded-md' alt={course?.thumbnail}
                        src={course?.thumbnail} />

                    <button className='w-full bg-green-500 py-3 text-lg font-serif text-white rounded-lg mt-2'
                        onClick={() => handleEnroll()}>{courseExist ? "UnEnroll" : "Enroll"}</button>

                    <div className='flex justify-between pt-4 md:items-center'>
                        <div className='flex flex-col md:flex-row md:items-center'>
                            <p className='text-2xl font-serif font-semibold md:border-r-2 border-r-black md:pr-6'>{course?.name}</p>
                            <p className='text-xl font-serif md:pl-6'>{course?.instructor}</p>
                        </div>
                        <div className='h-10 bg-violet-500 px-4 flex items-center rounded-lg'>
                            <p className='text-lg font-semibold font-serif text-white'>{course.location}</p>
                        </div>
                    </div>
                    <p className='text-base font-serif'>{course?.description}</p>
                    <div className='flex mt-2'>
                        <div className='bg-gray-500 w-24 text-center py-1 rounded-lg mr-4'>
                            <p className='font-serif text-white'>{course.enrollmentStatus}</p>
                        </div>
                        <p className='font-serif text-lg font-semibold'>Duration: {course.duration}</p>
                    </div>

                    <div className='mt-2'>
                        <p className='text-lg font-serif'><span className='font-semibold'>Schedule</span> : {course.schedule}</p>
                    </div>

                    <div className='mt-2'>
                        <div className='flex items-center'>
                            <div className='w-4 h-4 bg-black rounded-full' />
                            <p className='text-2xl font-serif font-semibold ml-4'>Prerequisites</p>
                        </div>
                        {course.prerequisites?.map((data) =>
                            <div className='flex items-center ml-4'>
                                <div className='w-2 h-2 bg-black rounded-full' />
                                <p className='font-serif text-base ml-2'>{data}</p>
                            </div>
                        )}
                    </div>

                    <div className='mt-4'>
                        <div className='flex items-center'>
                            <div className='w-4 h-4 bg-black rounded-full' />
                            <p className='text-2xl font-serif font-semibold ml-4'>Table Contents</p>
                        </div>
                        <div>
                            {course.syllabus?.map((content) =>
                                <div className='ml-4'>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center'>
                                            <div className='w-2 h-2 bg-black rounded-full' />
                                            <p className='font-serif text-lg ml-2'>{content.topic}</p>
                                        </div>
                                        <p className='font-serif text-base md:text-lg md:px-6 px-2 py-1 border rounded-lg text-nowrap'>Week <span className='text-xl md:text-2xl'>{content.week}</span></p>
                                    </div>
                                    <p className='font-serif text-base'>{content.content}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            : <div>Loading</div>
    )
}

export default SingleCourse