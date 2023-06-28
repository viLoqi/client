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

const Select = ({ courseName, setCourseName }: SelectProps) => {
    const router = useRouter();
    const { course, section_id } = router.query;

    // need to interpolate course name


    const [documentValue, collectionLoading, collectionError] = useDocument(doc(firebaseStore, `/chats/${courseName === '' ? 'CSE 101' : courseName}`));

    console.log(documentValue?.data());

    if (course) { setCourseName(course); }

    return <div className={styles.container}>
        {documentValue ? documentValue.data()!.sections.map((e: string) => { return <Link key={crypto.randomUUID()} href={`/chat?course=${courseName}&section_id=${e}`}>{e}</Link>; }) : <></>}
    </div>;
};

export default Select;