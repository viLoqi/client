import React from 'react';
import Image from "next/image";

import styles from "@/components/LandingPage/Hero.module.scss";
import alt_logo from "@/public/alt_logo.png";

const Hero = () => {
    return (
        <div className={styles["section"]}>
            <div className={styles["content-container"]}>
                <div className={styles["logo-container"]}>
                    <Image src={alt_logo} alt="loqi logo" fill />
                </div>
                <div className={styles["title-container"]}>
                    <h1>Connect Like Never Before</h1>
                </div>
                <div className={styles["description-container"]}>
                    <p>A place designed for Students by Student. Connect with peers, instructors, mentors outside of class.<br />Help is now accessible 24/7. Loqi is here to connect, help & encourage you to put your best foot forward.</p>
                </div>
                <a href="#login" className={styles["join-button-container"]}>
                    <p>Join Us</p>
                </a>
            </div>
        </div>
    );
}

export default Hero;