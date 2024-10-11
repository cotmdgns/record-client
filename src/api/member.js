import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

//회원가입
export const signup = async (data) => {
  return await instance.post("signup", data);
};

// export const signup = async (data) => {
//   alert(JSON.stringify(data));
//   return await axios.post("http://localhost:8080/api/signup/", data);
// };
