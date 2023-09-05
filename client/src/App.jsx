import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/homepage/homepage';
import Courses from './pages/Courses/Courses';
import Classes from './pages/Classes/Classes';

import Students from './pages/students/students';
import Teachers from './pages/teachers/teachers';

export default function App() {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/cours' element={<Courses />} />
            <Route exact path='/classes' element={<Classes />} />
            <Route exact path='/etudiants' element={<Students />} />
            <Route exact path='/professeurs' element={<Teachers />} />
        </Routes>
    );
}
