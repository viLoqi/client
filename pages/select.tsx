import React, { useState } from 'react';
import type { NextPage } from 'next';

import NavBar from '@/components/App/NavBar';
import Select from '@/components/Select/Select';

const CourseChat: NextPage = () => {
    const [courseName, setCourseName] = useState<string>('');

    return (
        <>
            <NavBar courseName={courseName} />
            <Select courseName={courseName} setCourseName={setCourseName} />
        </>
    );
};

export default CourseChat;
