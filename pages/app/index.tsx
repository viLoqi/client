import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { firebaseAuth } from "@/core/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Navbar from "@/components/App/NavBar";
import AppHome from "@/components/App/Home/AppHome";

const App: NextPage = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(firebaseAuth);

  // redirects to homepage if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user, router]);

  if (loading) {
    return <>
      <div>Loading ...</div>
    </>
  }

  return (
    <>
      <Navbar />
      <AppHome />
    </>
  );
};

export default App;
