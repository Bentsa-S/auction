import { useEffect, useState } from "react";

export const useCheckUser = (getToken = false) => {
  const [user, setUser] = useState<string | false>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem("auction_token");
    setToken(localToken);

    if (localToken) {
      try {
        const base64Url = localToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        setUser(payload.username);
      } catch (e) {
        console.error("Помилка при розборі токена:", e);
        setUser(false);
      }
    } else {
      setUser(false);
    }
  }, []);

  return getToken ? token : user;
};
