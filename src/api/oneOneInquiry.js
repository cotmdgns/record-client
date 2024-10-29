import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/oneOneInquiry",
});

// 1:1 문의 생성하기
export const createOneOneInquiry = async (data) => {
  return await instance.post("createOneOneInquiry", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const AllViewOneOneInquiry = async () => {
  return await instance.get("AllViewOneOneInquiry");
};
