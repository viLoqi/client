import React from "react";
import type { NextPage } from "next";

import Navbar from "@/components/NavBar/NavBar";
import Hero from "@/components/LandingPage/Hero";

const MainHome: NextPage = () => {
  return (
    <>
      <Navbar type="landing"></Navbar>
      <Hero></Hero>
    </>
  );
}

export default MainHome;