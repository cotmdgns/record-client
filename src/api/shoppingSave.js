import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/shoppingSave/",
});

export const createShoppingSave = async (data) => {
  return await instance.post("createShoppingSave", data);
};

export const allViewShoppingSave = async () => {
  return await instance.get("allViewShoppingSave/" + data);
};
