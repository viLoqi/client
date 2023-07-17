import { useRouter } from 'next/router';
import { firebaseStore, doc, useDocument, SectionInfoDoc, useAuthState, firebaseAuth } from '@/core/firebase';
import styles from './Select.module.scss';
import Link from 'next/link';
import DistrChart from './DistrChart';
import { User } from 'firebase/auth';

interface SelectProps {
    courseName: any
    setCourseName: any
}

const redirectSideEffect = (courseName: string, section: string, user: User) => {
    // Add this user to the list of online users for a chat room.
    // this can honestly be a cloud function
    return () => {
        console.log("Invoking CF to add user to list of online users")
        fetch(`${process.env.NEXT_PUBLIC_FIREBASE_FUNCTION_UPDATE_PRESENCE}?name=${user?.displayName}&course=${courseName}&section=${section}&photoURL=${user?.photoURL}`)
    }
}

const Select = ({ courseName, setCourseName }: SelectProps) => {
    const router = useRouter();
    const { course } = router.query;
    // This document contains the sections for a particular course
    const [sectionDocument, _isDocLoading, _docLoadErr] = useDocument(doc(firebaseStore, `/chats/${courseName === '' ? 'CSE101' : courseName}`));
    const [user, _isUserLoading, _userLoadError] = useAuthState(firebaseAuth)


    const sections = sectionDocument?.data()?.sections!

    if (course) { setCourseName(course); }

    // line 2 fetches professor name
    return (<div className={styles.container}>
        {sections !== undefined ? sections.map((e: SectionInfoDoc) => {
            return <div key={e.sec_id} className={styles['sectionCard']}>
                <Link key={crypto.randomUUID()} href={`/chat?course=${courseName}&section_id=${e.sec_id}`} onClick={redirectSideEffect(courseName, e.sec_id, user)}>{e.sec_id} by {e.sec_ins}</Link>
                <DistrChart courseName={courseName} instructor={e.sec_ins} />
            </div>

        }) : <></>}
    </div >)
};

export default Select;