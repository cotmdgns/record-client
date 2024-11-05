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
  return await instance.delete(
    `deleteShoppingSave?userCode=${data.userCode}&productCode=${data.productCode}`
  );
};
///////////// ( 바로 결제페이지 들어갈떄 상황 )
// 결제 페이지 넘어갈때 생성하기
export const createShoppingSaveOrder = async (data) => {
  return await instance.post("createShoppingSaveOrder", data);
};
// 결제페이지 들어가면 해당 정보 가져오기
export const createShoppingSaveOrderView = async (code) => {
  try {
    return await instance.get("createShoppingSaveOrderView/" + code);
  } catch (error) {
    alert("정상적인 접근방식이 아닙니다.");
  }
};
// 유저가 결제페이지에서 바로 나갈때 or 취소할때
export const createShoppingSaveOrderDelete = async (data) => {
  return await instance.delete(
    `createShoppingSaveOrderDelete?userCode=${data.userCode}&productCode=${data.productCode}`
  );
};
////////////

//////////// ( 장바구니에서 결제페이지 들어갈때 상황)
// 전체보여주기
export const createShoppingSaveView = async (code) => {
  try {
    return await instance.get("createShoppingSaveView/" + code);
  } catch (error) {
    alert("정상적인 접근방식이 아닙니다.");
  }
};
// 장바구니에서 삭제할때 상황
export const createShoppingSaveDelete = async (data) => {
  return await instance.delete(
    `createShoppingSaveDelete?shoppingCode=${data.shoppingCode}`
  );
};
// 장바구니에서 총합 결제 금액 보여주기
export const viewOrderPrice = async (code) => {
  return await instance.get(`viewOrderPrice?userCode=${code}`);
};
////////////

// 전체보여주기 (장바구니에서 사용)
export const allViewShoppingSave = async (code) => {
  return await instance.get("allViewShoppingSave/" + code);
};

// 페이지 들어가서 유저가 구독했는지
export const pageSaveCheck = async (data) => {
  return await instance.get(
    `pageSaveCheck/${data.userCode}/${data.productCode}`,
    data
  );
};

////////// ( 최종 결제 )
export const CreateProductOrder = async (data) => {
  return await instance.post("createProductOrder", data);
};
