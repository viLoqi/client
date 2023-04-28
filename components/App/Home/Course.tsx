import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { firebaseAuth } from '@/core/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import styles from '@/components/App/Home/Course.module.scss';
import Link from 'next/link';

interface CourseProps {
  courseName: string
}

const Course = ({ courseName }: CourseProps) => {
  const router = useRouter();
  const [user, authLoading, authError] = useAuthState(firebaseAuth);

  return (
    <Link href={`/chat?course=${courseName.toLowerCase()}`} className={styles.container}>
      <div className={styles['name-container']}>
        <p>{courseName.replace(/(\D+)(\d+)/, '$1 $2')}</p>
      </div>
    </Link>
  );
};

export default Course;
