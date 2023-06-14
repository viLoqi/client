import React, { useState } from 'react';
import type { NextPage } from 'next';

import NavBar from '@/components/App/NavBar';
import Chat from '@/components/Chat/Chat';

const CourseChat: NextPage = () => {
  const [courseName, setCourseName] = useState<string>('');

  console.log(courseName);

  return (
    <>
      <NavBar courseName={courseName} />
      <Chat setCourse={setCourseName} />
    </>
  );
};

export default CourseChat;
