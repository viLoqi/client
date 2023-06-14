import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { firebaseAuth, firebaseStore } from '@/core/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import styles from '@/components/App/Home/Course.module.scss';
import Link from 'next/link';

interface CourseProps {
  courseName: string
}

const Course = ({ courseName }: CourseProps) => {
  const router = useRouter();
  const [user, authLoading, authError] = useAuthState(firebaseAuth);

  // This user?.IdToken will be used to authenticate backend later on when if we do so
  // console.log(user?.getIdToken())


  const [value, loading, error] = useDocument(
    doc(firebaseStore, 'chats/', courseName),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  const sections = value?.data()?.sections ?? [];

  return (
    <Link href={`/chat?course=${courseName.toLowerCase()}`} className={styles.container}>
      <div className={styles['name-container']}>
        <p>{courseName.replace(/(\D+)(\d+)/, '$1 $2')}</p>
      </div>
      <p className={styles['section-heading']}>{sections.length} Section(s)</p>
    </Link>
  );
};

export default Course;
