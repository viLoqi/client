import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { firebaseAuth, firebaseStore } from '@/core/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { getFirestore, collection, doc } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

import styles from '@/components/App/Home/AppHome.module.scss';
import Course from '@/components/App/Home/Course';

const AppHome = () => {
  const router = useRouter();
  const [user, authLoading, authError] = useAuthState(firebaseAuth);

  const [collectionValue, collectionLoading, collectionError] = useCollection(collection(firebaseStore, 'chats/'));


  return (
    <div className={styles.section}>
      <div className={styles['courses-container']}>
        {collectionValue?.docs.map((e: any) =>
          (<Course key={crypto.randomUUID()} courseName={e.id} />))}
      </div>
    </div>
  );
};

export default AppHome;
