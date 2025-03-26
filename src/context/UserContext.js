import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userid, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userid, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
