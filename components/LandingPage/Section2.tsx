import React from 'react';
import Image from "next/image";

import styles from "@/components/LandingPage/Section2.module.scss";
import graphic from "@/public/graphics/landing2.svg";

const Section2 = () => {
    return (
        <div className={styles["section"]}>
            <div className={styles["content-container"]}>
                <div className={styles["graphic-container"]}>
                    <Image src={graphic} alt="woman on laptop studying and waving" fill />
                </div>
                <div className={styles["text-container"]}>
                    <div className={styles["title-container"]}>
                        <h1>Connect At Your Pace</h1>
                    </div>
                    <div className={styles["description-container"]}>
                        <p>Loqi is a platform with a chat and forum for both fast and slow communication where you connect at your convenience ...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section2;