import React from 'react';
import { useRouter } from 'next/router';
import { firebaseAuth, firebaseStore, useAuthState, collection, useCollection } from '@/core/firebase';
import styles from '@/components/App/Home/AppHome.module.scss';
import Course from '@/components/App/Home/Course';

const AppHome = () => {
  const router = useRouter();
  const [user, _isUserLoading, _userLoadErr] = useAuthState(firebaseAuth);
  const [chats, _isChatLoad, _chatLoadErr] = useCollection(collection(firebaseStore, 'chats/'));


  return (
    <div className={styles.section}>
      <div className={styles['courses-container']}>
        {chats?.docs.map((e: any) =>
          (<Course key={crypto.randomUUID()} courseName={e.id} />))}
      </div>
    </div>
  );
};

export default AppHome;
