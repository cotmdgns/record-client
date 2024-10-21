import { createContext, useState, useContext } from "react";
import { signup, userrDelete } from "../api/member";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // 여기서 회원가입 및 회원정보 수정하기, 삭제하기?

  // 회원가입
  const userSingUp = async (data) => {
    await signup(data);
  };

  // 수정하기
  const userUpdate = () => {};

  // 삭제하기

  return (
    <UserContext.Provider value={{ userSingUp, userUpdate }}>
      {children}
    </UserContext.Provider>
  );
};

export const useInForMation = () => useContext(UserContext);
