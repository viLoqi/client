import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { firebaseAuth, firebaseStore } from '@/core/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { getFirestore, collection, doc } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

import styles from '@/components/Chat/Chat.module.scss';

interface chatProps {
  setCourse: any// Dispatch<SetStateAction<string>>
  setSectionName: any
  courseName: string,
  sectionName: string,
}


const Chat = ({ setCourse, setSectionName, courseName, sectionName }: chatProps) => {
  const router = useRouter();
  const inputRef = useRef();
  const { course, section_id } = router.query;
  const [user, authLoading, authError] = useAuthState(firebaseAuth);

  if (course) {
    setCourse(course);
    setSectionName(section_id);
  }

  const [collectionValue, collectionLoading, collectionError] = useCollection(collection(firebaseStore, `chats/${courseName === '' ? 'CSE 101' : courseName}/${sectionName === '' ? '01-LEC' : sectionName}`));

  const handleOnClick = () => {
    fetch('http://localhost:8080/api/messaging', {
      method: 'POST', body: JSON.stringify({
        'collectionPath': `chats/${courseName}/${sectionName}/room/messages`,
        'content': inputRef.current.value
      })
    });
  };




  return (
    <div className={styles.section} >
      <nav className={styles['left-nav-container']}>

      </nav>
      <div className={styles['chat-container']}>
        <input ref={inputRef} onClick={handleOnClick}></input>
        <button>Send</button>
      </div>
    </div >
  );
};

export default Chat;
