import Navbar from "components/Navbars/Navbar";
import Admin from "layouts/Admin";
import React, { useEffect, useState } from "react";
import User from "../../models/User";
import InputMask from "react-input-mask";
import NoImage from "components/Image/NoImage";
import user from "pages/api/user";
import { classNames, getlocalUser } from "utils/functions";
import dynamic from "next/dynamic";
import { getAll, postFile } from "utils/Api";
import CurrencyInput from "react-currency-input";

const tabs = [
  { name: "DADOS", current: true },
  { name: "GALERIA", current: false },
];

export default function ProductForm(props) {
  const [data, setData] = useState(props.data != undefined ? props.data : {});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState({ data: [] });
  const [tab, setTab] = useState(tabs[0].name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    props.onSubmitEvent(data, file);
  };

  const handleChange = async (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCurrency = async (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      price: e.target.value.replace(/[^0-9]+/g, ""),
    });
  };

  const fileSelectHandler = async (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    setFile(file);
    reader.onloadend = function (e) {
      const images = [];
      images.push(reader.result);

      setData({
        ...data,
        images: [...data.images, ...images],
      });
    }.bind(this);

    const res = await postFile(file, "api/product/image/" + data._id);
    if(res.$success){
      setData(res.$success.info)
    }
  };

  useEffect(() => {
    async function fetchCategory() {
      const u = await getlocalUser()
      let query = ""

      const data = await getAll("api/category"+query);
      setCategories(data);
    }

    fetchCategory();
  }, []);

  const handleChangeTab = async (e) => {
    tabChange(e.target.value);
  };
  function tabChange(value) {
    setTab(value);
  }

  return (
    <>
      <div id="content" className={classNames(!data?._id ? "hidden" : "")}>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            value={tab || ""}
            onChange={handleChangeTab}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {tabs.map((t) => (
              <option key={t.name}>{t.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((t) => (
                <a
                  key={t.name}
                  onClick={() => tabChange(t.name)}
                  className={classNames(
                    tab == t.name
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                  )}
                >
                  {t.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className={tab == "DADOS" ? "" : "hidden"}>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 space-y-6 ">
            <div className="md:grid md:grid-cols-3 md:gap-3">
              <div className="md:col-span-1 py-2">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Product Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">.</p>
              </div>
              <div className="md:col-span-2">
                <div className="grid grid-cols-6 gap-6 ">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={data.name || ""}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Name..."
                      />
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      autoComplete="code"
                      value={data.code || ""}
                      onChange={handleChange}
                      placeholder="xxxx123"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <CurrencyInput
                      name="formattedPrice"
                      decimalSeparator=","
                      thousandSeparator="."
                      prefix="R$ "
                      value={data.formattedPrice || ""}
                      onChangeEvent={handleChangeCurrency}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {/* <input
                      type="number"
                      name="formattedPrice"
                      id="formattedPrice"
                      autoComplete="formattedPrice"
                      value={data.formattedPrice || ''}
                      onChange={handleChangeCurrency}
                      placeholder="000"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    /> */}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="inventory"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Inventory
                    </label>
                    <input
                      type="number"
                      name="inventory"
                      id="inventory"
                      autoComplete="inventory"
                      value={data.inventory || ""}
                      onChange={handleChange}
                      placeholder="000"
                      min="0"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      autoComplete="category"
                      value={data.category || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="''">Select</option>
                      {categories?.data?.map((item) => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      autoComplete="description"
                      value={data.description || ""}
                      onChange={handleChange}
                      placeholder="About"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className={tab == "GALERIA" ? "" : "hidden"}>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 space-y-6 ">
            <div className="md:grid md:grid-cols-3 md:gap-3">
              <div className="md:col-span-1 py-2">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Product Gallery
                </h3>
                <p className="mt-1 text-sm text-gray-500">.</p>
              </div>
              <div className="md:col-span-2">
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Nova Imagem
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={fileSelectHandler}
                    className="bg-white mt-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                  <div className="mt-10">
                    <label className="block text-lg font-medium text-gray-700">
                      Gallery
                    </label>
                    <div className="mt-4 flex flex-wrap gap-6  items-center">
                      <div
                        className={
                          data?.images?.length == 0
                            ? "text-gray-300 text-2xl"
                            : "hidden"
                        }
                      >
                        No Images
                      </div>
                      {data?.images?.map((item) => (
                        <div className="shadow-md rounded-full">
                          <img
                         className=" h-40 w-40 rounded-full"
                         src={item.url}
                         alt=""
                       />
                       <div className="hidden h-40 w-40 flex flex-col focus:block">
                        <div> A</div>
                        <div> B</div>
                       </div>
                        </div>
                         

                      )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div> */}
          </div>
        </form>
      </div>
    </>
  );
}
