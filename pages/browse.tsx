import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../components/Loader";
import useAuth from "../lib/useAuth";

const Browse = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user && !auth.loading) {
      router.push("/signin");
    }
  }, [auth.user, auth.loading, router]);

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  );
};

export default Browse;
