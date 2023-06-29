import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { firebaseAuth, firebaseStore } from '@/core/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onValue, ref } from 'firebase/database';
import { getFirestore, collection, } from 'firebase/firestore';
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
  const { course, section_id } = router.query;
  const [user, authLoading, authError] = useAuthState(firebaseAuth);
  const [msgs, setMsgs] = useState<JSX.Element[]>([]);
  const [message, setMessage] = useState('');

  console.log(user?.displayName);


  if (course) {
    setCourse(course);
    setSectionName(section_id);
  }

  const cname = courseName === '' ? 'CSE 101' : courseName;
  const sname = sectionName === '' ? '01-LEC' : sectionName;
  const [collectionValue, collectionLoading, collectionError] = useCollection(collection(firebaseStore, `chats/${cname}/${sname}/room/messages`), { snapshotListenOptions: { includeMetadataChanges: true } });


  const handleOnClick = () => {
    if (message)
      fetch('http://localhost:8080/api/messaging', {
        method: 'POST', body: JSON.stringify({
          'collectionPath': `chats/${courseName}/${sectionName}/room/messages`,
          'content': message,
          'author': user?.displayName
        })
      }).then(() => { console.log('Message Sent!'); });
  };

  return (
    <div className={styles.section} >
      <nav className={styles['left-nav-container']}>

      </nav>
      <div className={styles['chat-container']}>
        {collectionValue?.docs.map(e => {
          const { content, author } = e.data();
          return <div key={crypto.randomUUID()}>{content} by {author}</div>;
        })}
        <input onChange={e => setMessage(e.target.value)}></input>
        <button onClick={handleOnClick}>Send</button>
      </div>
    </div >
  );
};

export default Chat;
