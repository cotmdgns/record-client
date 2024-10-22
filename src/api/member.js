import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/userTable",
});

//회원가입
export const signup = async (data) => {
  return await instance.post("signup", data);
};

//로그인
export const login = async (data) => {
  return await instance.post("login", data);
};

//아이디 중복체크
export const idCheck = async (id) => {
  return await instance.get("idCheck/" + id);
};

/* 삭제 */
// 탈퇴하기
export const userDelete = async (code) => {
  console.log(code);
  return await instance.delete(`userDelete/${code}`);
};

/* 업데이트 */
// 회원 정보 수정하기
export const userUpDatePut = async (data) => {
  try {
    return await instance.put("upDataController", data);
  } catch (error) {
    return error.response;
  }
};

// export const signup = async (data) => {
//   alert(JSON.stringify(data));
//   return await axios.post("http://localhost:8080/api/signup/", data);
// };
