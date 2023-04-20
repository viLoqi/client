import React from "react";
import Image from "next/image";
import { Icon } from '@iconify/react';

import styles from "@/components/App/NavBar.module.scss";
import NavBarBase from "@/components/NavBar/NavBarBase";
import profilePicture from "@/public/default_pfp.png";

const NavBar = () => {

  return (
    <NavBarBase>
      <div className={styles["right-container-landing"]}>

        {/* TODO Change this to redirect to /. If you are redirected to /, if logged in, redirect to home */}
        <a href="#"><Icon icon="material-symbols:home" /></a>
        <a href="#"><Icon icon="material-symbols:key-rounded" rotate={1} /></a>
        <a href="#"><Icon icon="fluent:book-contacts-28-filled" /></a>

        <div className={styles["profile-container"]}>
          <Image src={profilePicture} alt="profile picture" fill />
        </div>
      </div>
    </NavBarBase>
  );
}

export default NavBar;