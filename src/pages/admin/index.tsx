import { useRouter } from "next/router";
import { getlocalUser } from "utils/functions";
import React, { useEffect } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { get } from "utils/Api";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];
function Admin() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      fetchMyAPI();
    }, 300);
  }, []);

  const fetchMyAPI = async () => {
    const user = await getlocalUser();
    let userId = "";
    if (user) {
      userId = "?userId=" + user._id;
    }
    const res = await get(null, "api/auth/me" + userId);
    if (res.$success) {
      localStorage.setItem("token", res.$success.info.token);
      localStorage.setItem("user", JSON.stringify(res.$success.info.user));
      router.push("admin/dashboard");
    } else {
      router.push("admin/login");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100 animate-pulse">
      <div className="m-auto text-center text-gray-500 text-4xl ">
        Carregando...
      </div>
    </div>
  );
}

export default Admin;
