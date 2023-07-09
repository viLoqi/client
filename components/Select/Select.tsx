import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { firebaseAuth, firebaseStore } from '@/core/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { getFirestore, collection, doc, query, where } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import styles from './Select.module.scss';
import Course from '@/components/App/Home/Course';
import Link from 'next/link';

interface SelectProps {
    courseName: any
    setCourseName: any// Dispatch<SetStateAction<string>>
}

interface InfoDoc {
    sec_id: string
    sec_ins: string
}

interface GradeData {
    section: string
    term: string
    courseTitle: string
    instructor: string
    grades: { [key: string]: number }
}

const Select = ({ courseName, setCourseName }: SelectProps) => {
    const router = useRouter();
    const { course } = router.query;

    // This document contains the sections for a particular course
    const [sectionDocument, isDocLoad, IsDocError] = useDocument(doc(firebaseStore, `/chats/${courseName === '' ? 'CSE101' : courseName}`));

    const sections = sectionDocument?.data()?.sections!

    if (course) { setCourseName(course); }

    // line 2 fetches professor name
    return <div className={styles.container}>
        {sectionDocument ? sections.map((e: InfoDoc) => { return <Link key={crypto.randomUUID()} href={`/chat?course=${courseName}&section_id=${e.sec_id}`}>{e.sec_id}</Link>; }) : <></>}
        {sectionDocument ? sections.map((e: InfoDoc) => {
            fetch(`https://gradus.jiechen.dev/api/all/?query=${e.sec_ins}&field=instructor`).then(r => r.json().then(data => {
                const rel = data.filter((pastCourse: GradeData) => pastCourse.section.includes(courseName))
                console.log(rel)
            }))
        }) : <></>}
    </div>;
};

export default Select;