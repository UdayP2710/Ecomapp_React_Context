import { createContext, useContext, useState } from "react";
const LoginContext = createContext(); //creating context..................

//.............consuming context................//
export const useLoginContext = () => {
  const { login, setLogin } = useContext(LoginContext);
  return { login, setLogin };
};

//..............providing context..................//
export const LoginContextProvider = ({ children }) => {
  const [login, setLogin] = useState({ id: null, status: false });
  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
