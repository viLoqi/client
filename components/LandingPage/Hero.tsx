import React from 'react';

import styles from "@/components/LandingPage/Hero.module.scss";

const Connect = () => {
    return (
        <div className={styles["section"]}>
            <div className={styles["content-container"]}>
                <div className={styles["title-container"]}>
                    <h1>Connect Like Never Before</h1>
                </div>
                <div className={styles["description-container"]}>
                    <p>A place designed for Students by Student. Connect with peers, instructors, mentors outside of class. Help is now accessible 24/7. Loqi is here to connect, help & encourage you to put your best foot forward.</p>
                </div>
                <div className={styles["join-button-container"]}>
                    <a href="">Join Us</a>
                </div>
            </div>
        </div>
    );
}

export default Connect;