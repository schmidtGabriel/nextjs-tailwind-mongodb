import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  LibraryIcon,
  MenuAlt2Icon,
  ShoppingBagIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { CollectionIcon, SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { getlocalUser } from "../../utils/functions";
import NoImage from "components/Image/NoImage";
import { logout } from "utils/Api";

const navigation = [
  {
    name: "Dashboard",
    value: "dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
    current: false,
    roles: ["admin", "owner", "user"],
  },
  {
    name: "Usuários",
    value: "usuarios",
    href: "/admin/user",
    icon: UsersIcon,
    current: false,
    roles: ["admin", "owner", "user"],
  },
  {
    name: "Estabelecimentos",
    value: "estabelecimentos",
    href: "/admin/locations",
    icon: ShoppingBagIcon,
    current: false,
    roles: ["admin", "owner", "user"],
  },
];

const settings = [
  {
    name: "Categorias",
    value: "categoria",
    href: "/admin/categories",
    icon: HomeIcon,
    current: false,
    roles: ["admin"],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const rootpage = router.pathname.replace("/", "").split("/");
  for (var i = 0; i < navigation.length; i++) {
    navigation[i].current = false;
    if (rootpage[1] == navigation[i].value) {
      navigation[i].current = true;
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const u = await getlocalUser();
    setUser(u);
  }

  function hasRole(array) {
    for (let index = 0; index < user?.roles.length; index++) {
      if (array.indexOf(user?.roles[index]) > -1) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <MobileMenu
        hasRole={hasRole}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
      ></MobileMenu>

      <DesktopMenu hasRole={hasRole} user={user}></DesktopMenu>

      {/* top bar and childer */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-gray-800 shadow">
          <button
            className="px-4 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="w-full flex">
            <div className="w-full text-white text-2xl text-center self-center mr-16">
              ONDE.IR
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export function MobileMenu({ hasRole, sidebarOpen, setSidebarOpen, user }) {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 flex z-40 md:hidden"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pb-4 bg-gray-800">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full "
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex flex-col items-center flex-shrink-0 py-10 bg-gray-900">
              {user?.imageURL != "" ? (
                <img
                  className="h-20 w-20 rounded-full"
                  src={user?.imageURL}
                  alt=""
                />
              ) : (
                <span className="inline-block h-16 w-16 mr-2 rounded-full overflow-hidden bg-gray-100">
                  <NoImage />
                </span>
              )}
              <a href={`/admin/user/${user?._id}`}>
                <div className="text-lg font-medium text-white mt-2 cursor-pointer">
                  Bem vindo {user?.name}
                </div>
              </a>
              <div className="text-sm font-light text-white mt-2 cursor-pointer">
                Log out
              </div>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto divide-y divide-white">
              <nav className="px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      !hasRole(item.roles) ? "hidden" : "",
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "mr-4 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>

              <nav className="px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      !hasRole(item.roles) ? "hidden" : "",
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "mr-4 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export function DesktopMenu({ hasRole, user }) {
  return (
    <div className="hidden md:flex md:flex-shrink-0 ">
      <div className="flex flex-col w-64">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col h-0 flex-1">
          <div className="flex flex-col items-center flex-shrink-0 py-10 bg-gray-900">
            {user?.imageURL ? (
              <img
                className="h-20 w-20 rounded-full"
                src={user?.imageURL}
                alt=""
              />
            ) : (
              <span className="inline-block h-20 w-20 mr-2 rounded-full overflow-hidden bg-gray-100">
                <NoImage />
              </span>
            )}
            <a href={`/admin/user/${user?._id}`}>
              <div className="text-lg font-medium text-white mt-2 cursor-pointer">
                Bem vindo {user?.name}
              </div>
            </a>
            <div
              onClick={logout}
              className="text-sm font-light text-white mt-2 cursor-pointer underline"
            >
              Log out
            </div>
          </div>
          <div className=" flex-1 flex-col px-2 overflow-y-auto divide-y divide-slate-50 bg-gray-800">
            <nav className="flex flex-col  py-4 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    !hasRole(item.roles) ? "hidden" : "",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-gray-300"
                        : "text-gray-400 group-hover:text-gray-300",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
            <nav className="flex flex-col py-4  space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    !hasRole(item.roles) ? "hidden" : "",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-gray-300"
                        : "text-gray-400 group-hover:text-gray-300",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
