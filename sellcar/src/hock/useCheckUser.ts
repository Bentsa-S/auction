import { useEffect, useState } from "react";

export const useCheckUser = () => {
  const [user, setUser] = useState<string | false>(false);

  useEffect(() => {
    const token = localStorage.getItem("auction_token");
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      setUser(payload.username)
    } else {
      setUser(false);
    }
  }, []);

  return user;
};
