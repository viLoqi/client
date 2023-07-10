import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { firebaseStore } from '@/core/firebase';

import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import styles from './Select.module.scss';
import Link from 'next/link';
import DistrChart from './DistrChart';

interface SelectProps {
    courseName: any
    setCourseName: any
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

    const [gradeData, setGradeData] = useState<{ [key: string]: { [key: string]: number } }>({})

    const tally = (arr: GradeData[]): { [key: string]: number } => {
        const total: { [key: string]: number } = {};
        arr.forEach((r) => {
            Object.keys(r.grades).forEach((e) => {
                if (e in total) {
                    total[e] = total[e] + r.grades[e];
                } else {
                    total[e] = r.grades[e];
                }
            });
        });
        return total;
    };



    const router = useRouter();
    const { course } = router.query;
    // This document contains the sections for a particular course
    const [sectionDocument, isDocLoad, IsDocError] = useDocument(doc(firebaseStore, `/chats/${courseName === '' ? 'CSE101' : courseName}`));

    const sections = sectionDocument?.data()?.sections!

    useEffect(() => {
        const data = sectionDocument?.data()
        if (data) {
            data.sections.forEach(async (e: InfoDoc) => {
                await fetch(`https://gradus.jiechen.dev/api/all/?query=${e.sec_ins}&field=instructor`).then(r => r.json().then(result => {
                    const rel: GradeData[] = result.filter((pastCourse: GradeData) => pastCourse.section.includes(courseName))

                    const ob: { [key: string]: { [key: string]: number } } = {}
                    ob[e.sec_ins] = tally(rel)
                    setGradeData((prev) => Object.assign(ob, prev))
                }))
            })
        }
    }, [sectionDocument])

    if (course) { setCourseName(course); }

    // line 2 fetches professor name
    return (<div className={styles.container}>
        {sections ? sections.map((e: InfoDoc) => {
            return <>
                <Link key={crypto.randomUUID()} href={`/chat?course=${courseName}&section_id=${e.sec_id}`}>{e.sec_id} by {e.sec_ins}</Link>
                <DistrChart course={courseName} data={gradeData[e.sec_ins]} />
            </>

        }) : <></>}
    </div >)
};

export default Select;