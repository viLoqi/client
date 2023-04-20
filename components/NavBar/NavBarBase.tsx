import React, { ReactNode } from "react";
import Image from "next/image";

import styles from "@/components/NavBar/NavBarBase.module.scss";
import logo from "@/public/graphics/signin.png";

import { Roboto_Serif } from "@next/font/google";

const roboto_serif = Roboto_Serif({
    subsets: ["latin"],
});

interface NavBarBaseProps {
    children?: ReactNode;
}

const NavBarBase = ({ children }: NavBarBaseProps) => {
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
            {children}
        </nav>
    );
}

export default NavBarBase;