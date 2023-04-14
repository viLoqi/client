import type { NextPage } from "next";

import React from "react";
import { firebaseAuth } from "@/core/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Navbar from "@/components/HomePage/NavBar";

const ChatHome: NextPage = () => {
  const [user, loading, error] = useAuthState(firebaseAuth);
  return (
    <>
      <Navbar></Navbar>
    </>
  ); //user ? <HomePage /> : <LandingPage />;
};

export default ChatHome;
