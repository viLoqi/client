import React, { useEffect } from 'react';
import { useRouter } from "next/router";

import { firebaseAuth } from "@/core/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import styles from "@/components/App/Home/Course.module.scss";
import Link from 'next/link';

interface CourseProps {
    courseName: String
}

const Course = ({ courseName }: CourseProps) => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(firebaseAuth);

    const trimmedCourseName = courseName.replace(" ", "").toLowerCase();


    return (
        <Link href={`/app/${trimmedCourseName}`}>
            <div className={styles["container"]}>
                <div className={styles["name-container"]}>
                    <p>{courseName}</p>
                </div>
            </div>
        </Link>
    );
}

export default Course;