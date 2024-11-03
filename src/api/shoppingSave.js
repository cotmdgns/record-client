import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/shoppingSave/",
});

// 유저 장바구니 만들기
export const createShoppingSave = async (data) => {
  return await instance.post("createShoppingSave", data);
};
// 유저 장바구니 삭제
export const deleteShoppingSave = async (data) => {
  console.log(data);
  console.log(data.userCode);
  console.log(data.productCode);
  return await instance.delete(
    `deleteShoppingSave?userCode=${data.userCode}&productCode=${data.productCode}`
  );
};
/////////////
// 유저가 바로 결제페이지로 넘어갈때 상황
export const createShoppingSaveOrder = async (data) => {
  return await instance.post("createShoppingSaveOrder", data);
};
// 결제페이지 들어가면 해당 정보 가져오기
export const createShoppingSaveOrderView = async (code) => {
  return await instance.get("createShoppingSaveOrder/" + code);
};
// 유저가 결제페이지에서 바로 나갈때 or 취소할때
export const createShoppingSaveOrderDelete = async (data) => {
  return await instance.delete(
    `createShoppingSaveOrderDelete?userCode=${data.userCode}&productCode=${data.productCode}`
  );
};
////////////
// 전체보여주기 (장바구니에서 사용)
export const allViewShoppingSave = async (code) => {
  return await instance.get("allViewShoppingSave/" + code);
};

// 페이지 들어가서 유저가 구독했는지
export const pageSaveCheck = async (data) => {
  console.log(data.userCode);
  console.log(data.productCode);
  console.log(data);
  return await instance.get(
    `pageSaveCheck/${data.userCode}/${data.productCode}`,
    data
  );
};
