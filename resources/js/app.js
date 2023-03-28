import React from 'react';
import { render } from 'react-dom';

import CourseEditForm from './components/CourseEditForm';
import { CourseContextProvider } from './CourseContext';

render(
    <CourseContextProvider>
        <CourseEditForm/>
    </CourseContextProvider>,
    document.getElementById('root')
    );