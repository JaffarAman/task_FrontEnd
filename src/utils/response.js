import axios from "axios";
import { BASE_URL } from "../config";

const getUserToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
};

const getHeader = () => {
  return {
    Authorization: "Bearer" + " " + getUserToken(),
  };
};

const postMethodCustomHeader = (relativesUrl, obj) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/${relativesUrl}`, obj, {
        headers: getHeader(),
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const postMethodWithoutToken = (relativesUrl, obj) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/${relativesUrl}`, obj)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getMethodWithoutToken = (relativesUrl, obj) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/${relativesUrl}`, obj)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getMethodCustomHeader = (relativesUrl, obj) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/${relativesUrl}`, {
        headers: getHeader(),
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteMethodCustomHeader = (relativesUrl, obj) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASE_URL}/${relativesUrl}`, {
        headers: getHeader(),
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const putMethodCustomHeader = (relativesUrl, obj) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASE_URL}/${relativesUrl}`, obj, {
        headers: getHeader(),
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {
  postMethodCustomHeader,
  postMethodWithoutToken,
  getMethodWithoutToken,
  getMethodCustomHeader,
  deleteMethodCustomHeader,
  putMethodCustomHeader,
};
