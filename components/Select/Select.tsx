import { useRouter } from 'next/router';
import { firebaseStore, doc, useDocument, SectionInfoDoc, useAuthState, firebaseAuth, firebaseApp } from '@/core/firebase';
import styles from './Select.module.scss';
import Link from 'next/link';
import DistrChart from './DistrChart';
import { User } from 'firebase/auth';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { getFunctions } from 'firebase/functions';
interface SelectProps {
    courseName: any
    setCourseName: any
}

const Select = ({ courseName, setCourseName }: SelectProps) => {
    const router = useRouter();
    const { course } = router.query;
    // This document contains the sections for a particular course
    const [sectionDocument, _isDocLoading, _docLoadErr] = useDocument(doc(firebaseStore, `/chats/${courseName === '' ? 'CSE101' : courseName}`));
    const [user, _isUserLoading, _userLoadError] = useAuthState(firebaseAuth)

    const [executeCallable, executing, error] = useHttpsCallable(
        getFunctions(firebaseApp),
        'update_presence',
    );

    const sections = sectionDocument?.data()?.sections!

    if (course) { setCourseName(course); }

    // line 2 fetches professor name
    return (<div className={styles.container}>
        {sections !== undefined ? sections.map((e: SectionInfoDoc) => {
            return <div key={e.sec_id} className={styles['sectionCard']}>
                <Link key={crypto.randomUUID()} href={`/chat?course=${courseName}&section_id=${e.sec_id}`} onClick={async () => {
                    await executeCallable({ uid: user?.uid, name: user?.displayName, course: courseName, section: e.sec_id, photoURL: user?.photoURL });
                }}>{e.sec_id} by {e.sec_ins}</Link>
                <DistrChart courseName={courseName} instructor={e.sec_ins} />

            </div>

        }) : <></>}
    </div >)
};

export default Select;