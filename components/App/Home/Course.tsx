import React from 'react';
import { useRouter } from 'next/router';
import { firebaseAuth, firebaseStore, useDocument, doc, useAuthState } from '@/core/firebase';
import styles from '@/components/App/Home/Course.module.scss';
import Link from 'next/link';

interface CourseProps {
  courseName: string
}

const Course = ({ courseName }: CourseProps) => {
  const router = useRouter();
  const [user, _isUserLoading, _userLoadErr] = useAuthState(firebaseAuth);

  // This user?.IdToken will be used to authenticate backend later on when if we do so
  // console.log(user?.getIdToken())


  const [value, loading, error] = useDocument(
    doc(firebaseStore, 'chats/', courseName),
  );

  const sections = value?.data()?.sections ?? [];

  return (
    <Link href={`/select?course=${courseName}`} className={styles.container}>
      <div className={styles['name-container']}>
        <p>{courseName.replace(/(\D+)(\d+)/, '$1 $2')}</p>
      </div>
      <p className={styles['section-heading']}>{sections.length} Section(s)</p>
    </Link>
  );
};

export default Course;
