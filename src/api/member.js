import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/record/",
})

export const singup = async (data) => {
    return await instance.post("signup",data)
};