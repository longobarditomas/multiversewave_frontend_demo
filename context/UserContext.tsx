import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './User/UserInterfaces';
import useRequest from "../hooks/use-request";

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          let response = await useRequest(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, "get", {});
          if (response.data) setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
      fetchData();
    }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
