import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { firebaseAuth, useAuthState } from '@/core/firebase';

import styles from '@/components/LandingPage/Hero.module.scss';
import alt_logo from '@/public/alt_logo.png';

const Hero = () => {
    const [user, _isUserLoading, _userLoadErr] = useAuthState(firebaseAuth);
    const [buttonFragment, setButtonFragment] = useState<JSX.Element>(<></>);

    useEffect(() => {
        if (!_isUserLoading && !user) {
            setButtonFragment(
                <Link href="#login" className={styles['join-button-container']}>
                    <p>Join Us</p>
                </Link>
            );
        } else {
            setButtonFragment(
                <Link href="/app" className={styles['join-button-container']}>
                    <p>Connect</p>
                </Link>
            );
        }
    }, [_isUserLoading, user]);

    return (
        <div className={styles.section}>
            <div className={styles['content-container']}>
                <div className={styles['logo-container']}>
                    <Image src={alt_logo} alt="loqi logo" fill />
                </div>
                <div className={styles['title-container']}>
                    <h1>Connect Like Never Before</h1>
                </div>
                <div className={styles['description-container']}>
                    <p>A place designed for Students by Student. Connect with peers, instructors, mentors outside of class.<br />Help is now accessible 24/7. Loqi is here to connect, help & encourage you to put your best foot forward.</p>
                </div>
                {buttonFragment}
            </div>
        </div>
    );
};

export default Hero;
