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

// 1:1 문의 전체보기
export const AllViewOneOneInquiry = async () => {
  return await instance.get("AllViewOneOneInquiry");
};

// 1:1 문의 디테일 보기
export const DetailOneOneView = async (code) => {
  return await instance.get("DetailOneOneView/" + code);
};
//////////////////////
// 1:1 문의 댓글 만들기
export const CreateComment = async (data) => {
  return await instance.post("CreateComment", data);
};
// 해당 문의 댓글 보여주기
export const ViewComment = async (code) => {
  return await instance.get("ViewComment/" + code);
};
