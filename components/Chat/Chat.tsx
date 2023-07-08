import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { firebaseAuth, firebaseStore } from '@/core/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, collection, query, orderBy } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { KeyboardEvent } from 'react';

import styles from '@/components/Chat/Chat.module.scss';
import Message, { MessageElement } from './Message';

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
  const chatBoxRef = useRef<HTMLDivElement>(null)

  console.log(user?.displayName);
  console.log(user?.photoURL)


  if (course) {
    setCourse(course);
    setSectionName(section_id);
  }

  const cname = courseName === '' ? 'CSE 101' : courseName;
  const sname = sectionName === '' ? '01-LEC' : sectionName;
  const [collectionValue, collectionLoading, collectionError] = useCollection(query(collection(firebaseStore, `chats/${cname}/${sname}/room/messages`), orderBy("firstCreated", "desc")))

  useEffect(() => {
    // This will pin the chatbox to the bottom
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [message, collectionValue])

  const handleOnClick = () => {
    if (message)
      fetch('/api/messaging', {
        method: 'POST', body: JSON.stringify({
          'collectionPath': `chats/${courseName}/${sectionName}/room/messages`,
          'content': message,
          'author': user?.displayName,
          'authorPhotoURL': user?.photoURL,
        })
      }).then(() => {
        console.log('Message Sent!');
      }).catch(e => { console.log(e); });
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOnClick()
    }
  }

  return (
    <div className={styles.section} >
      <nav className={styles['left-nav-container']}>

      </nav>


      <div className={styles['main']}>
        <div className={styles['chat-container']} ref={chatBoxRef}>
          {collectionValue?.docs.map(e => {
            const currMsg = e.data() as MessageElement
            return <Message key={crypto.randomUUID()} {...currMsg} />;
          })}
        </div>

        <div className={styles['input-container']}>
          <input onChange={e => setMessage(e.target.value)} onKeyDown={e => handleOnKeyDown(e)}></input>
          <button onClick={handleOnClick} >Send</button>
        </div>
      </div>

    </div >
  );
};

export default Chat;
