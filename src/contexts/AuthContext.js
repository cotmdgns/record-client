import { createContext, useState, useContext } from "react";
// Context 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 로그인 상태
  const [id, setId] = useState(localStorage.getItem("id"));
  const [name, setName] = useState(localStorage.getItem("name"));

  //로그인
  const login = (data) => {
    localStorage.setItem("id", data.userId);
    localStorage.setItem("name", data.userName);
    setId(data.id);
    setName(data.name);
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    setId(null);
    setName(null);
    alert("로그아웃 됬습니다");
  };

  const nullCheck = () => {
    if (localStorage.getItem("id") !== null) {
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ id, name, login, logout, nullCheck }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

/// 흐름자체가
// context 자체가 특정 상태를 가지고 여러가지를 관리할때 사용
// 리듀서 자체가 특정 상태를 가지고 여러가지를 관리할때 사용( 대신 비동기처리일때 )
/*
1. AuthContext 생성하고
2. AuthContext.Provider 전역적으로 사용할수있게끔 만들어주면서 벨류값을 받아내고
3. 프로바이더에서 값을 받고 다시 그 값을 children에 호출하면서
4. AuthProvider 를 호출함으로써 기능 실행.

*/
