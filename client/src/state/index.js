import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    courses: [],
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setCourse: (state, action) => {
            const updatedCourse = state.courses.map((course) => {
                if (course._id === action.payload.course._id)
                    return action.payload.course;
                return course;
            });
            state.courses = updatedCourse;
        },
        setCourses: (state, action) => {
            state.courses = action.payload.courses;
        }
    }
});

export const { setUser, setLogin, setCourse, setCourses, setLogout } = globalSlice.actions;

export default globalSlice.reducer;  