import React from 'react';
import ReactDOM from "react-dom/client";

import CourseEditForm from './components/CourseEditForm';
import { CourseContextProvider } from './CourseContext';
import './style.scss';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <CourseContextProvider>
    <CourseEditForm />
  </CourseContextProvider>
);
