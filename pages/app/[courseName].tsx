import React, { useEffect } from 'react';
import { useRouter } from "next/router";

import { firebaseAuth } from "@/core/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import styles from "@/components/App/Home/Course.module.scss";
// import styles from "@/components/App/CourseChat/CourseChat.module.scss";

const CourseChat = () => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(firebaseAuth);

    const { courseName } = router.query;


    return (
        <div className={styles["container"]}>
            <div className={styles["name-container"]}>
                <p>{courseName}</p>
            </div>
        </div>
    );
}

export default CourseChat;