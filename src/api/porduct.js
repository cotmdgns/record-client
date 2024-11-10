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

//////////////////////////////
// LP페이지에 모든 정보 보여주기
export const AllView = async (data) => {
  return await instance.get(
    `AllView?no=${data.no}&productType=${data.productType}`
  );
};
// LP페이지 카운트
export const TotalPage = async (type) => {
  return await instance.get("TotalPage/" + type);
};

// LP디테일 페이지 보여주기
export const DetailView = async (data) => {
  return await instance.get(
    `DetailView/${data.productCode}?userCode=${data.userCode}`
  );
};

// LP,Record 생성하기
export const CreateLpRecordProduct = async (data) => {
  return await instance.post("CreateLpRecordProduct", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
