import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { createShoppingSaveViewList } from "../api/shoppingSave";

const UserSaveListContext = createContext();

export const UserSaveListProvider = ({ children = null }) => {
  const { member } = useAuth();
  // 장바구니 정보들
  const [orderList, setOrderList] = useState(0);
  const productSaveList = async () => {
    if (member?.userCode) {
      const result = await createShoppingSaveViewList(member?.userCode);
      setOrderList(result.data);
    }
  };

  // 비우는 기능

  useEffect(() => {
    if (member?.userCode) {
      productSaveList();
    }
  }, [member]);

  return (
    <UserSaveListContext.Provider value={{ orderList, productSaveList }}>
      {children}
    </UserSaveListContext.Provider>
  );
};
export const useSaveListAuth = () => useContext(UserSaveListContext);
