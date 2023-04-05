import React from "react";
import Image from "next/image";

import styles from "@/components/NavBar/NavBar.module.scss";
import logo from "@/public/logo.png";

import { Roboto_Serif } from "@next/font/google";

const roboto_serif = Roboto_Serif({
  subsets: ["latin"],
});

interface NavBarTypes {
  type: "landing" | "app";
}

const NavBar = ({ type }: NavBarTypes) => {

  let otherContainers;
  switch (type) {
    case "landing":
      otherContainers = <>
        <div className={styles["middle-container-landing"]}>
        </div>
        <div className={styles["right-container-landing"]}>
          <div>
            <a href="">Sign Up</a>
          </div>
          <div>
            <a href="">Log In</a>
          </div>
        </div>
      </>
      break;
    case "app":
      otherContainers = <>
        <div className={styles["middle-container-app"]}>
        </div>
        <div className={styles["right-container-app"]}>

        </div>
      </>
      break;
  }


  return (
    <nav className={styles["nav"]}>
      <div className={styles["left-container"]}>
        <div className={styles["logo-container"]}>
          <Image src={logo} alt="loqi logo" fill></Image>
        </div>
        <div className={styles["brand-name-container"]}>
          <h1 className={roboto_serif.className}>Loqi</h1>
        </div>
      </div>
      {otherContainers}
    </nav>
  );
}

export default NavBar;