import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080/api/noticeBorad",
});

// 게시판 생성하기
export const createNoticeBoard = async (data) => {
  return await instance.post("createNoticeBoard", data);
};

// 게시판 보여주기
export const viewBoard = async () => {
  return await instance.get("viewBoard");
};

// 디테일 정보 가져오기
export const detailViewNoticeBoard = async (code) => {
  return await instance.get("detailViewNoticeBoard/" + code);
};
