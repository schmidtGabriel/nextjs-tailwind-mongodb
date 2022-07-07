import router from "next/router";
import { baseURL, header } from "../utils/mongodb";
import { getlocalToken } from "./functions";

export async function getAll(route) {
  console.log(await getlocalToken());
  const res = await fetch(baseURL + route, {
    method: "GET",
    headers: {
      ...header,
      authorization: "DoNada " + (await getlocalToken()),
    },
  });
  if (res) {
    return res.json();
  } else {
    return "Error";
  }
}

export async function get(id, route) {
  console.log("x");
  var getRoute = "";
  if (id) {
    getRoute = baseURL + route + "/" + id;
  } else {
    getRoute = baseURL + route;
  }

  const res = await fetch(getRoute, {
    method: "GET",
    headers: {
      ...header,
      authorization: "DoNada " + (await getlocalToken()),
    },
  });
  if (res) {
    return res.json();
  } else {
    return "Error";
  }
}

export async function post(data, route) {
  const res = await fetch(baseURL + route, {
    method: "POST",
    headers: {
      ...header,
      authorization: "DoNada " + (await getlocalToken()),
    },
    body: JSON.stringify(data),
  });
  if (res) {
    return res.json();
  } else {
    return "Error";
  }
}

export async function put(data, route) {
  const res = await fetch(baseURL + route + "/" + data._id, {
    method: "PUT",
    headers: {
      ...header,
      authorization: "DoNada " + (await getlocalToken()),
    },
    body: JSON.stringify(data),
  });
  if (res) {
    return res.json();
  } else {
    return "Error";
  }
}

export async function del(id, route) {
  const res = await fetch(baseURL + route + "/" + id, {
    method: "DELETE",
    headers: {
      ...header,
      authorization: "DoNada " + (await getlocalToken()),
    },
  });
  if (res) {
    return res.json();
  } else {
    return "Error";
  }
}

export async function postFile(file, route) {
  const formData = new FormData();
  formData.append("file", file, file.name);
  const res = await fetch(baseURL + route, {
    method: "POST",
    headers: {
      // ...header,
      authorization: "DoNada " + (await getlocalToken()),
    },
    body: formData,
  });
  if (res) {
    return res.json();
  } else {
    return "Error";
  }
}

export async function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  router.push("/admin");
}
