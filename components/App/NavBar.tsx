import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';

import { firebaseAuth } from '@/core/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import styles from '@/components/App/NavBar.module.scss';
import NavBarBase from '@/components/NavBar/NavBarBase';
import profilePicture from '@/public/default_pfp.png';

interface NavBarProps {
  courseName?: string;
  sectionName?: string;
}

const NavBar = ({ courseName, sectionName }: NavBarProps) => {
  const router = useRouter();
  const [user, authLoading, authError] = useAuthState(firebaseAuth);

  // redirects to homepage if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [authLoading, user, router]);

  return (
    <NavBarBase>
      {courseName && sectionName
        ? <div className={styles['middle-container']}>
          <h1>{courseName.replace(/(\D+)(\d+)/, '$1 $2')} / </h1>
          <h1>{sectionName.replace(/(\D+)(\d+)/, '$1 $2')}</h1>
        </div>
        : <></>}

      <div className={styles['right-container']}>

        <Link href="#"><Icon icon="material-symbols:home" /></Link>
        <Link href="#"><Icon icon="material-symbols:key-rounded" rotate={1} /></Link>
        <Link href="#"><Icon icon="fluent:book-contacts-28-filled" /></Link>

        <div className={styles['profile-container']}>
          <Image src={profilePicture} alt="profile picture" fill />
        </div>
      </div>
    </NavBarBase>
  );
};

export default NavBar;
