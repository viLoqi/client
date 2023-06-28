import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { firebaseAuth, firebaseStore } from '@/core/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { getFirestore, collection, doc, query, where } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import styles from '@/components/App/Home/AppHome.module.scss';
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
    const [documentValue, collectionLoading, collectionError] = useDocument(doc(firebaseStore, '/chats/CSE 101'));

    console.log(documentValue?.data());

    if (course) { setCourseName(course); }

    return <div>
        {documentValue ? documentValue.data()!.sections.map((e: string) => { return <Link key={crypto.randomUUID()} href={`/chat?course=${courseName.toLowerCase()}&section_id=${e.toLowerCase()}`}>{e}</Link>; }) : <></>}
    </div>;
};

export default Select;