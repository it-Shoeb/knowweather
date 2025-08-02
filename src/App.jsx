import "./App.css";
import earth from "../public/background/eartchImage.png";
import background from "../public/background/background.jpg";
import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

function App() {
  const [ToggleState, setToggleState] = useState(false);
  const [SearchInput, setSearchInput] = useState("");

  const [Result, setResult] = useState("");

  const toggleForm = () => {
    setToggleState(!ToggleState);
  };

  // useEffect(() => {

  // }, [SearchInput])

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_OPENWEATHER_URL}${SearchInput}&appid=${
          import.meta.env.VITE_OPENWEATHER_API
        }`
      );
      setResult(res.data);
      setToggleState(true);
    } catch (error) {
      alert(error.response.data.message);
    }
    setSearchInput("");
  };

  const handleDataForm = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  return (
    <>
      <div
        className={`form-container absolute left-0 sm:left-[25%] h-1/2 sm:h-1/3 z-50 w-full sm:w-1/2 sm:p-2 p-4 transition-all duration-700 bg-[#ffffffaa] rounded-md flex justify-center items-start ${
          ToggleState ? "-top-1/2 sm:-top-1/3" : "top-0"
        }`}
      >
        <form
          className="flex flex-col gap-10 w-full"
          action=""
          onSubmit={(e) => {
            handleForm(e);
          }}
        >
          <h1 className="font-bold text-4xl text-center">
            Search Your City Name
          </h1>

          <div className="border border-[#ffffffaa] px-4 py-1  rounded-xl flex items-center focus:bg-[#ffffff33] hover:bg-[#ffffff33]">
            <FaSearch className="text-white cursor-pointer" />

            <input
              className="w-full px-4 py-1 outline-0 text-[#ffffff]"
              type="text"
              name="query"
              id=""
              placeholder="Enter your location"
              value={SearchInput}
              onChange={(e) => {
                handleDataForm(e);
              }}
            />
            <RxCross2
              className={`text-white cursor-pointer ${
                SearchInput.length > 1 ? "flex" : "hidden"
              }`}
              onClick={(e) => {
                setSearchInput("");
              }}
            />
          </div>

          <input
            className="border border-[#ffffffaa] text-white font-bold px-4 py-1 rounded-xl outline-0 focus:bg-[#ffffff33] hover:bg-[#ffffff33]"
            type="submit"
            value="Search"
          />
        </form>

        <div
          className={`toggle w-14 aspect-square absolute -bottom-14  left-[44%] rounded-b-4xl transition-all duration-700 ${
            ToggleState ? "bg-[#ffffffaa]" : "bg-[#ffffffaa]"
          }`}
          onClick={(e) => {
            toggleForm();
          }}
        ></div>
      </div>

      {Result && (
        <div
          className={`result absolute left-0 flex items-center justify-center  gap-4 sm:gap-64 sm:top-36 top-20 sm:flex-row flex-col sm:p-4 text-white transition-all duration-500 ${
            ToggleState
              ? "w-full"
              : "w-0 overflow-hidden origin-center left-[50%] opacity-0"
          }`}
        >
          <div className="location">
            <p className="text-2xl">
              {Result?.city?.name}, {Result?.city?.country}
            </p>
          </div>
          <div className="temp flex flex-col justify-center text-center">
            <img
              src={`https://openweathermap.org/img/wn/${Result?.list[0]?.weather[0]?.icon}.png`}
              alt=""
            />
            <p className="text-4xl font-bold">
              {Math.floor(Result?.list[0]?.main?.temp - 273.15)} {Error}
            </p>
            <p className="">{Result?.list[0]?.weather[0]?.description}</p>
          </div>
          <div className="details">
            <p>wind speed - {Result?.list[0]?.wind?.speed}</p>
            <p>humidity - {Result?.list[0]?.main?.humidity} </p>
            <p>feels_like - {Result?.list[0]?.main?.feels_like} </p>
            <p>
              Lat and lon - {Result?.city?.coord?.lat} and{" "}
              {Result?.city?.coord?.lon}{" "}
            </p>
          </div>
        </div>
      )}

      <div className="bg bg-black">
        <img className="" src={earth} alt="" />
      </div>
    </>
  );
}

export default App;
