import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/shoppingSave/",
});

// 찜하기 만들기
export const createShoppingSave = async (data) => {
  return await instance.post("createShoppingSave", data);
};

// 전체보여주기
export const allViewShoppingSave = async (code) => {
  return await instance.get("allViewShoppingSave/" + code);
};
