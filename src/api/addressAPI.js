import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/address",
});

// 유저 주소 보여주기 ( 모달 )
export const allAddress = async (code) => {
  return await instance.get(`allAddress/${code}`);
};
// 유저 주소 보여주기
export const viewAddress = async (data) => {
  return await instance.post("viewAddress", data);
};

// 유저 주소 생성하기
export const createAddress = async (data) => {
  return await instance.post("createAddress", data);
};

// 유저 주소 수정하기
export const putAddress = async (data) => {
  return await instance.put("putAddress", data);
};

// 유저 주소 삭제하기
export const deleteAddress = async (data) => {
  return await instance.delete(
    `deleteAddress/${data.userCode}/${data.addressCode}`
  );
};
