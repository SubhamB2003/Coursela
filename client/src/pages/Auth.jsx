import axios from "axios";
import { Formik } from "formik";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { setLogin } from "../state";


const initialFormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const loginSchema = yup.object().shape({
    email: yup.string().email("email required").required("email required"),
    password: yup.string().required("password required").min(5, "password should be greater then 5 character")
});

const registerSchema = yup.object().shape({
    username: yup.string().required("Username required"),
    email: yup.string().email("email required").required("email required"),
    password: yup.string().required("password required").min(5, "password should be greater then 5 character"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
});

function Auth() {

    const dispatch = useDispatch();
    const [pagaType, setPageType] = useState("Login");

    const handleLogin = async (values) => {
        const res = await axios.post(`${process.env.REACT_APP_URL}/user/login`, values);
        if (res.status === 200) {
            dispatch(setLogin({
                user: res.data.user,
                token: res.data.token
            }));
        }
    }

    const handleRegister = async (values) => {
        const res = await axios.post(`${process.env.REACT_APP_URL}/user/register`, values);
        if (res.status === 201) {
            alert("Registration Successful!");
            setPageType("Login");
        }
    }

    const handleFormSubmit = async (values) => {
        if (pagaType === "Login") await handleLogin(values);
        else await handleRegister(values);
    }


    return (
        <div className='w-[100%] h-[100vh] bg-gray-100'>
            <div className='h-[10%] bg-white flex justify-center items-center'>
                <p className='text-2xl font-serif font-bold uppercase'>Demo Cousera</p>
            </div>

            <Formik onSubmit={handleFormSubmit}
                initialValues={initialFormValues}
                validationSchema={pagaType === "Login" ? loginSchema : registerSchema}>
                {({ values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    resetForm }) => (
                    <form className='w-[100%] h-[80%] flex justify-center items-center' onSubmit={handleSubmit}>
                        <div className='w-[90%] md:w-[50%] xl:w-[35%] border shadow-2xl rounded-xl px-8 md:px-16 py-10 space-y-8 bg-white'>
                            {pagaType === "Register" &&
                                <div>
                                    <div className="relative">
                                        <input name="username" type="text" id="floating_outlined1" className={`block px-2.5 pb-2.5 pt-4 w-full text-lg font-serif text-black bg-transparent rounded-lg border-2 ${touched.username && errors.username ? "border-red-600" : "border-slate-900"} appearance-none focus:outline-none peer`}
                                            value={values.username} onChange={handleChange} onBlur={handleBlur} placeholder="" />
                                        <label htmlFor="floating_outlined1" className="absolute text-lg font-serif text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Username</label>
                                    </div>
                                    {touched.username && errors.username && <p className="text-sm font-serif text-red-600">{errors.username}</p>}
                                </div>
                            }

                            <div>
                                <div className="relative">
                                    <input name="email" type="text" id="floating_outlined2" className={`block px-2.5 pb-2.5 pt-4 w-full text-lg font-serif text-black bg-transparent rounded-lg border-2 ${touched.email && errors.email ? "border-red-600" : "border-slate-900"} appearance-none focus:outline-none peer`}
                                        value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="" />
                                    <label htmlFor="floating_outlined2" className="absolute text-lg font-serif text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
                                </div>
                                {touched.email && errors.email && <p className="text-sm font-serif text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <div className="relative">
                                    <input name="password" type="text" id="floating_outlined3" className={`block px-2.5 pb-2.5 pt-4 w-full text-lg font-serif text-black bg-transparent rounded-lg border-2 ${touched.password && errors.password ? "border-red-600" : "border-slate-900"} appearance-none focus:outline-none peer`}
                                        value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="" />
                                    <label htmlFor="floating_outlined3" className="absolute text-lg font-serif text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                                </div>
                                {touched.password && errors.password && <p className="text-sm font-serif text-red-600">{errors.password}</p>}
                            </div>
                            {pagaType === "Register" &&
                                <div>
                                    <div className="relative">
                                        <input name="confirmPassword" type="text" id="floating_outlined4" className={`block px-2.5 pb-2.5 pt-4 w-full text-lg font-serif text-black bg-transparent rounded-lg border-2 ${touched.confirmPassword && errors.confirmPassword ? "border-red-600" : "border-slate-900"} appearance-none focus:outline-none peer`}
                                            value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="" />
                                        <label htmlFor="floating_outlined4" className="absolute text-lg font-serif text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm Password</label>
                                    </div>
                                    {touched.confirmPassword && errors.confirmPassword && <p className="text-sm font-serif text-red-600">{errors.confirmPassword}</p>}
                                </div>
                            }

                            <div className="w-full">
                                <button type="submit" className="w-full py-2.5 font-serif text-lg font-bold text-white bg-violet-500 rounded-lg">
                                    {pagaType === "Login" ? "Login" : "Register"}
                                </button>

                                <div className='mt-4'>
                                    <p className='font-serif text-base text-center cursor-pointer' onClick={() => {
                                        setPageType(pagaType === "Login" ? "Register" : "Login");
                                    }}>
                                        {pagaType === "Login" ? "Don't have an account ? Sign Up" : "Already have an account ? Sign In"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>)}
            </Formik>
        </div>
    )
}

export default Auth