import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Icon } from '@iconify/react';

import { useSignInWithGoogle, useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '@/core/firebase';

import styles from '@/components/LandingPage/Login.module.scss';
import graphic from '@/public/graphics/signin.png';

const Login = () => {
  const router = useRouter();

  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);
  const googleSignIn = () => {
    signInWithGoogle([], { hd: 'stonybrook.edu' }).then(_ => router.push('/app'));
  };

  return (
    <div id="login" className={styles.section}>
      <div className={styles['content-container']}>
        <div className={styles['title-container']}>
          <h1>Are Your Ready to Join Loqi?</h1>
        </div>
        <div className={styles['logo-container']}>
          <Image src={graphic} alt="person holding key" fill />
        </div>
        <div className={styles['buttons-container']}>
          <a onClick={() => { googleSignIn(); }}>
            <Icon icon="mdi:google" />
          </a>
          <a href=""><p>SSO Sign In</p></a>
        </div>
      </div>
    </div>
  );
};

export default Login;
