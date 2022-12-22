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

  try {
    switch (type) {
      case "GET":
        const { data } = await instanse.get(url);
        return data;

      case "POST":
        const { data } = await instanse.post(url, body);
        return data;

      case "PUT":
        const { data } = await instanse.put(url, body);
        return data;

      case "DELETE":
        const { data } = await instanse.delete(url);
        return data;
    }
  } catch (error) {
    throw error.message;
  }
};
