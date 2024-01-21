import React, { Suspense, lazy } from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleCourse from './components/SingleCourse';
const Auth = lazy(() => import("./pages/Auth"));
const Home = lazy(() => import("./pages/Home"));


function App() {

  const isAuth = useSelector((state) => state.token);

  return (
    <BrowserRouter>
      <Suspense fallback={"Loading..."}>
        <Routes>
          <Route path='/' element={isAuth ? <Home /> : <Auth />} />
          <Route path='/course/:courseId' element={isAuth ? <SingleCourse /> : <Auth />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App