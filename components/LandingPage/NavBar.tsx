import React from 'react'
import styles from '@/components/LandingPage/NavBar.module.scss'
import NavBarBase from '@/components/NavBar/NavBarBase'

const NavBar = () => {
  return (
    <NavBarBase>
      <div className={styles['right-container-landing']}>
        <div>
          <a href="">Sign Up</a>
        </div>
        <div>
          <a href="">Log In</a>
        </div>
      </div>
    </NavBarBase>
  )
}

export default NavBar
