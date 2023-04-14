import React from "react";
import type { NextPage } from "next";

import Navbar from "@/components/LandingPage/NavBar";
import Hero from "@/components/LandingPage/Hero";

const MainHome: NextPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
    </>
  );
}

export default MainHome;