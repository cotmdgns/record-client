import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/product/",
});

// 메인페이지에 10개만 보여주기
export const MainLP = async () => {
  return await instance.get("MainLP");
};

// 메인페이지에 10개만 보여주기
export const MainRecord = async () => {
  return await instance.get("MainRecord");
};

// LP페이지에 모든 정보 보여주기
export const AllViewLp = async () => {
  return await instance.get("AllViewLp");
};
// LP디테일 페이지로 이동하기
export const DetailViewLp = async (code) => {
  return await instance.get("DetailViewLp" + code);
};

// 레코드페이지에 모든 정보 보여주기
export const AllViewRecord = async () => {
  return await instance.get("AllViewRecord");
};
// LP디테일 페이지로 이동하기
export const DetailViewRecord = async (code) => {
  return await instance.get("DetailViewLp" + code);
};
