import React, { useState } from 'react';
import type { NextPage } from 'next';

import NavBar from '@/components/App/NavBar';
import Chat from '@/components/Chat/Chat';

const CourseChat: NextPage = () => {
  const [courseName, setCourseName] = useState<string>('');
  const [sectionName, setSectionName] = useState<string>('');

  return (
    <>
      <NavBar courseName={courseName} sectionName={sectionName} />
      <Chat courseName={courseName} sectionName={sectionName} setCourse={setCourseName} setSectionName={setSectionName} />
    </>
  );
};

export default CourseChat;
