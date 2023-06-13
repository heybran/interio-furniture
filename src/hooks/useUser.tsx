import { useEffect, useState } from "react";

interface User {
  username: string;
  avatarUrl: string;
  isLoggedIn: boolean;
}

export default function useUser() {
  const [user, setUser] = useState<User>({
    username: "",
    avatarUrl: "",
    isLoggedIn: false,
  });

  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/user/verify`,
          {
            credentials: "include",
          },
        );

        const { username, avatarUrl } = await res.json();
        setUser({
          ...user,
          username,
          avatarUrl,
          isLoggedIn: true,
        });
      } catch (error) {
        setUser({
          ...user,
          username: "",
          avatarUrl: "",
          isLoggedIn: false,
        });
      } finally {
        setIsPending(false);
      }
    })();
  }, []);

  return { isPending, user };
}