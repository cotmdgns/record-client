import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const MainLP = async () => {
  // 메인페이지에 10개만 보여주기
  return await instance.get("MainLP");
};
