import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { firebaseAuth, firebaseStore, useAuthState, collection, useCollection } from '@/core/firebase';
import styles from '@/components/App/Home/AppHome.module.scss';
import Course from '@/components/App/Home/Course';

const AppHome = () => {
  const router = useRouter();
  const [user, _isUserLoading, _userLoadErr] = useAuthState(firebaseAuth);
  const [chats, setChats] = useState([])


  useEffect(() => {
    fetch("/api/system/all").then(r => r.json().then(d => setChats(d)))
  }, [])

  return (
    <div className={styles.section}>
      <div className={styles['courses-container']}>
        {chats.map((e: string) =>
          (<Course key={crypto.randomUUID()} courseName={e} />))}
      </div>
    </div>
  );
};

export default AppHome;
