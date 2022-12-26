import axios from "axios";

const instanse = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const $api = async ({ url, type = "GET", auth = false, body }) => {
  if (auth) {
    const token = localStorage.getItem("token");
    instanse.defaults.headers.common["Authorization"] = token;
  }
  let data;
  try {
    switch (type) {
      case "GET":
        data = await instanse.get(url);
        break;

      case "POST":
        data = await instanse.post(url, body);
        break;
      case "PUT":
        data = await instanse.put(url, body);
        break;
      case "DELETE":
        data = await instanse.delete(url);
        break;
    }
    return data.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : error.message;
  }
};
