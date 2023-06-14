import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';

import { firebaseAuth } from '@/core/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { getFirestore, collection, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import styles from '@/components/Chat/Chat.module.scss';
import Link from 'next/link';

interface chatProps {
  setCourse: any// Dispatch<SetStateAction<string>>
}

const Chat = ({ setCourse }: chatProps) => {
  const router = useRouter();
  const { course, section_id } = router.query;
  const [user, authLoading, authError] = useAuthState(firebaseAuth);

  if (course) { setCourse(course); }

  return (
    <div className={styles.section}>
      <nav className={styles['left-nav-container']}>

      </nav>
      <div className={styles['chat-container']}>

      </div>
    </div>
  );
};

export default Chat;
