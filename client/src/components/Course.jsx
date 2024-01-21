import React from 'react';
import { useNavigate } from 'react-router-dom';

function Course({ course, i }) {

    const navigate = useNavigate();
    const courseId = course._id;

    return (
        <div div key={i + course._id} className='w-[100%] md:w-[30%] border shadow-2xl bg-white rounded-md p-4 cursor-pointer'
            onClick={() => navigate(`/course/${courseId}`)}>
            <img className='w-full h-60 object-cover rounded-md' alt={course.thumbnail}
                src={course.thumbnail} />
            <p className='text-2xl font-serif font-semibold pt-4 '>{course.name}</p>
            <p className='text-lg font-serif'>{course.instructor}</p>
            <p className='text-base font-serif'>{course.description}</p>
        </div>
    )
}

export default Course