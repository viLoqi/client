import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import { firebaseAuth, firebaseStore, useCollection, collection, query, orderBy, useAuthState, MessageDoc, UserDoc, firebaseApp } from '@/core/firebase';
import styles from '@/components/Chat/Chat.module.scss';
import Message from './Message';
import OnlineUser from './UserAvatar';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { getFunctions } from 'firebase/functions';

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
  const [attachment, setAttachment] = useState<File>();
  const chatBoxRef = useRef<HTMLDivElement>(null)

  const [executeCallable, executing, error] = useHttpsCallable(
    getFunctions(firebaseApp),
    'update_presence',
  );

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


  // if (typeof window !== 'undefined') {
  //   window.onbeforeunload = async function () {
  //     console.log("TRIGGERED CLOSE")
  //     await executeCallable({ uid: user?.uid, name: user?.displayName, course: courseName, section: sectionName, photoURL: user?.photoURL, status: 'off' })
  //   };
  // }

  const handleOnClick = async () => {
    if (message) {
      fetch('/api/messaging/', {
        method: 'POST', body: JSON.stringify({
          'collectionPath': `chats/${courseName}/${sectionName}/room/messages`,
          'content': message,
          'author': user?.displayName,
          'authorPhotoURL': user?.photoURL,
        })
      }).then(() => {
        console.log('Message Sent!');
      }).catch(e => { console.log(e); });

    }

    if (attachment) {
      const formData = new FormData();

      formData.append("file", attachment)
      formData.append("file_channel_source", `/chats/${courseName}/${sectionName}/room/messages`)
      formData.append("author", user?.displayName!)
      formData.append('authorPhotoURL', user?.photoURL!)

      fetch('/api/file/', {
        method: 'POST',
        body: formData,
      });
    }

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
          <input type="file"
            id="attachment" name="attachment"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files) {
                setAttachment(e.target.files[0])
              }
            }}
          ></input>
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
