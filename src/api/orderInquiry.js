import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// 유저 아이디로 결제 및 구매내역 보여주기
export const userId = async (id) => {
  return await instance.get("userId/" + id);
};
