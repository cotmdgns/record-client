import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080/api/noticeBorad",
});

// 게시판 생성하기
export const createNoticeBoard = async (data) => {
  await instance.post("createNoticeBoard", data);
};

// 게시판 보여주기
export const viewBoard = async () => {
  await instance.get("viewBoard");
};
