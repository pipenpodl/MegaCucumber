import axios from "axios"
import { URL_SERVER } from "./config";


export const getDataFromserver = (page) => {
        return axios.get(`${URL_SERVER}${page}`);
  };

export const sendDataToServer = (data,page) => {
      axios.post(`${URL_SERVER}${page}`, data);
    };