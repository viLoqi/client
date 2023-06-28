import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { firebaseAuth } from '@/core/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import styles from '@/components/Chat/Chat.module.scss';

interface chatProps {
  setCourse: any// Dispatch<SetStateAction<string>>
  setSectionName: any
}

const Chat = ({ setCourse, setSectionName }: chatProps) => {
  const router = useRouter();
  const { course, section_id } = router.query;
  const [user, authLoading, authError] = useAuthState(firebaseAuth);



  if (course) {
    setCourse(course);
    setSectionName(section_id);
  }

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
