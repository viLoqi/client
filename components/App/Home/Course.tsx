import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { firebaseAuth, useAuthState } from '@/core/firebase'
import styles from '@/components/App/Home/Course.module.scss'
import Link from 'next/link'
import useGlobalStore from '@/core/global'

interface CourseProps {
  courseName: string
}

const Course = ({ courseName }: CourseProps) => {
  const router = useRouter()
  const [user, _isUserLoading, _userLoadErr] = useAuthState(firebaseAuth)
  const [sections, setSections] = useState([])
  const { global_setCourseName: setCourseName } = useGlobalStore()

  useEffect(() => {
    fetch(`/api/system/sections?course_name=${courseName}`).then(r =>
      r.json().then(d => setSections(d))
    )
  }, [courseName])

  const handleOnClick = () => {
    setCourseName(courseName)
  }

  return (
    <Link href={`/select?course=${courseName}`} className={styles.container} onClick={handleOnClick}>
      <div className={styles['name-container']}>
        <p>{courseName.replace(/(\D+)(\d+)/, '$1 $2')}</p>
      </div>
      <p className={styles['section-heading']}>{sections.length} Section(s)</p>
    </Link>
  )
}

export default Course
