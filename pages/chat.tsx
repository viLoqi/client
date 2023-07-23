import React from 'react';
import type { NextPage } from 'next';

import NavBar from '@/components/App/NavBar';
import Chat from '@/components/Chat/Chat';

const CourseChat: NextPage = () => {
    return (
        <>
            <NavBar />
            <Chat />
        </>
    );
};

export default CourseChat;
