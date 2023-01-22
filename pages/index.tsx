import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";
import { firebaseAuth } from "@/core/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(firebaseAuth);
  return user ? <HomePage /> : <LandingPage />;
}
