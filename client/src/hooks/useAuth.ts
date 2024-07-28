import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { updateCurrentUser } from "@/lib/slices/app.slice";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/info`,
          { withCredentials: true }
        );
        dispatch(updateCurrentUser(response.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(updateCurrentUser(null));
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [dispatch]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(updateCurrentUser(null));
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLogout };
};
