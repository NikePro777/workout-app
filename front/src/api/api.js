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

      case "POST":
        data = await instanse.post(url, body);

      case "PUT":
        data = await instanse.put(url, body);

      case "DELETE":
        data = await instanse.delete(url);
    }
    return data.data;
  } catch (error) {
    throw error.message;
  }
};
