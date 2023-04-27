import React, { useEffect } from 'react';
import { useRouter } from "next/router";

import { firebaseAuth } from "@/core/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import styles from "@/components/App/Home/AppHome.module.scss";
import Course from "@/components/App/Home/Course";

const AppHome = () => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(firebaseAuth);

    const coursesList = ["CSE 101", "CSE 320", "WRT 102", "AMS 261", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"]


    return (
        <div className={styles["section"]}>
            <div className={styles["courses-container"]}>
                {coursesList.map((course: String) =>
                    (<Course key={course} courseName={course} />))}
            </div>
        </div>
    );
}

export default AppHome;