import React, { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/router'
import { firebaseAuth, firebaseStore, useCollection, collection, query, orderBy, useAuthState, MessageDoc, UserDoc } from '@/core/firebase'
import styles from '@/components/Chat/Chat.module.scss'
import Message from './Message'
import OnlineUser from './UserAvatar'

const Chat = () => {
  const router = useRouter()
  const [user, _isUserLoading, _userLoadErr] = useAuthState(firebaseAuth)
  const [message, setMessage] = useState('')
  const [attachment, setAttachment] = useState<File>()
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const [chatID, setChatID] = useState('default')

  useEffect(() => {
    const courseName = router.query.course
    const sectionName = router.query.section
    const url = encodeURI(`/api/system/classChatRoomID?course_name=${courseName}&section_name=${sectionName}`)
    if (courseName && sectionName)
      fetch(url).then(r => r.text().then(d => setChatID(d)))
  }, [router.query])


  const [messageCollectionPath, setMessageCollectionPath] = useState(`chats/${chatID === '' ? router.query.id : chatID}/messages`)

  useEffect(() => {
    setMessageCollectionPath(`chats/${chatID}/messages`)
  }, [chatID])

  const [firebaseMessages, _fbMessageLoading, _fbMessageLoadingErr] = useCollection(query(collection(firebaseStore, messageCollectionPath), orderBy('firstCreated', 'desc')))
  const [onlineUserList, _userListLoading, _userListLoadingErr] = useCollection(query(collection(firebaseStore, messageCollectionPath), orderBy('name', 'asc')))

  useEffect(() => {
    // This will pin the chatbox to the bottom
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [message, firebaseMessages])

  const handleOnClick = async () => {
    if (attachment) {
      const formData = new FormData()

      formData.append('file', attachment)
      formData.append('file_channel_source', messageCollectionPath)
      formData.append('author', user?.displayName!)
      formData.append('authorPhotoURL', user?.photoURL!)


      fetch('/api/file/', {
        method: 'POST',
        body: formData,
      }).then(() => {
        console.log('Attachment Sent')
      }).catch(e => { console.error(e) })
    }

    if (message) {
      fetch('/api/messaging/', {
        method: 'POST', body: JSON.stringify({
          'collectionPath': messageCollectionPath,
          'content': message,
          'author': user?.displayName,
          'authorPhotoURL': user?.photoURL,
        })
      }).then(() => {
        console.log('Message Sent!')
      }).catch(e => { console.error(e) })
    }
  }

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      handleOnClick()
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
  )
}

export default Chat
