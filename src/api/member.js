import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
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

// export const signup = async (data) => {
//   alert(JSON.stringify(data));
//   return await axios.post("http://localhost:8080/api/signup/", data);
// };
