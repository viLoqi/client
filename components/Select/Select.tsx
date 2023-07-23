import { useRouter } from 'next/router';
import { SectionInfoDoc, useAuthState, firebaseAuth, firebaseApp } from '@/core/firebase';
import styles from './Select.module.scss';
import Link from 'next/link';
import DistrChart from './DistrChart';
import { useEffect, useState } from 'react';
import useGlobalStore from '@/core/global';
const Select = () => {
    // This document contains the sections for a particular course
    const [user, _isUserLoading, _userLoadError] = useAuthState(firebaseAuth)
    const [courseName, setCourseName] = useState('')
    const { global_setSectionName: setSectionName } = useGlobalStore()
    const router = useRouter()
    const [sections, setSections] = useState([])

    useEffect(() => {
        setCourseName(router.query.course as string)
    }, [router.query])

    useEffect(() => {
        if (courseName)
            fetch(`/api/system/sections?course_name=${courseName}`).then(r =>
                r.json().then(d => setSections(d))
            )
    }, [courseName])

    const handleOnClick = (name: string) => {
        setSectionName(name)
    }

    return (<div className={styles.container}>
        {sections !== undefined ? sections.map((e: SectionInfoDoc) => {
            return <div key={e.section} className={styles['sectionCard']}>
                <Link key={crypto.randomUUID()} href={`/chat/?course=${courseName}&section=${e.section}`} onClick={async () => {
                    handleOnClick(e.section)
                }}>{e.section} by {e.instructor}</Link>
                <DistrChart courseName={courseName} instructor={e.instructor} />
            </div>

        }) : <></>}
    </div >)
};

export default Select;