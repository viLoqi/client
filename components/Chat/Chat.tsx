import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import { firebaseAuth, firebaseStore, useCollection, collection, query, orderBy, useAuthState, MessageDoc, UserDoc } from '@/core/firebase';
import styles from '@/components/Chat/Chat.module.scss';
import Message from './Message';
import OnlineUser from './OnlineUser';

interface ChatProps {
  setCourse: any// Dispatch<SetStateAction<string>>
  setSectionName: any
  courseName: string,
  sectionName: string,
}

const Chat = ({ setCourse, setSectionName, courseName, sectionName }: ChatProps) => {
  const router = useRouter();
  const { course, section_id } = router.query;
  const [user, _isUserLoading, _userLoadErr] = useAuthState(firebaseAuth);
  const [message, setMessage] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null)

  if (course) {
    setCourse(course);
    setSectionName(section_id);
  }

  const cname = courseName === '' ? 'CSE 101' : courseName;
  const sname = sectionName === '' ? '01-LEC' : sectionName;
  const [firebaseMessages, _fbMessageLoading, _fbMessageLoadingErr] = useCollection(query(collection(firebaseStore, `chats/${cname}/${sname}/room/messages`), orderBy("firstCreated", "desc")))
  const [onlineUserList, _userListLoading, _userListLoadingErr] = useCollection(query(collection(firebaseStore, `chats/${cname}/${sname}/room/users`), orderBy("name", "asc")))

  useEffect(() => {
    // This will pin the chatbox to the bottom
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [message, firebaseMessages])


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
          {firebaseMessages?.docs.map(e => {
            const currMsg = e.data() as MessageDoc
            return <Message key={crypto.randomUUID()} {...currMsg} />
          })}
        </div>

        <div className={styles['input-container']}>
          <input onChange={e => setMessage(e.target.value)} onKeyDown={e => handleOnKeyDown(e)}></input>
          <button onClick={handleOnClick} >Send</button>
        </div>
      </div>

      <div className={styles['user-list-container']}>
        {onlineUserList?.docs.map(e => {
          const currUser = e.data() as UserDoc
          return <OnlineUser key={e.id} {...currUser} />
        })}
      </div>

    </div >
  );
};

export default Chat;
