"use client";
import { useEffect, useState } from "react";

const Page2 = () => {
  const [results, setResults] = useState(["", "", ""]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [intervals, setIntervals] = useState([0, 0, 0]);
  const [money, setMoney] = useState(0);
  const [winMoney, setWinMoney] = useState(0);
  const [spins, setSpins] = useState(0);
  const [multiply, setMultiply] = useState(1);
  const [addMoney, setAddMoney] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const checkIntervals = (value) => {
    if (value >= 1 && value < 40) return "Normal";
    if (value >= 77 && value <= 99) return "Rare";
    if (value >= 40 && value < 60) return "Blue";
    if (value >= 62 && value < 72) return "Gold";
    if (value >= 72 && value < 77) return "Platina";
    if (value >= 60 && value < 62) return "Nova";
  };

  const intervalColors = {
    Normal: "bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 ",
    Rare: "bg-gradient-to-r from-orange-100  via-orange-500  to-orange-100",
    Blue: "bg-gradient-to-r from-blue-300  via-blue-700  to-blue-300 border border-gray-300",
    Gold: "bg-gradient-to-r from-yellow-300  via-yellow-700  to-yellow-300 border border-blue-300",
    Platina:
      "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400  border border-yellow-300",
    Nova: "bg-gradient-to-r from-purple-200 via-purple-500 to-purple-200",
  };

  const spinSlotMachine = () => {
    setIsSpinning(true);
    setSpins((prev) => prev + 1);
    const newResults = Array.from(
      { length: 3 },
      () => Math.floor(Math.random() * 99) + 1
    );

    setTimeout(() => {
      setIsSpinning(false);
      setResults(newResults);
      setIntervals(newResults.map(checkIntervals));
      MoneyPlusHandler(newResults);
    }, 1000);
  };

  const MoneyPlusHandler = (newResults) => {
    let moneyPlus = null;
    if (newResults.every((value) => value === "Normal"))
      moneyPlus = 10 * multiply;
    else if (newResults.every((value) => value === "Rare"))
      moneyPlus = 50 * multiply;
    else if (newResults.every((value) => value === "Blue"))
      moneyPlus = 200 * multiply;
    else if (newResults.every((value) => value === "Gold"))
      moneyPlus = 1000 * multiply;
    else if (newResults.every((value) => value === "Platina"))
      moneyPlus = 5000 * multiply;
    else if (newResults.every((value) => value === "Nova"))
      moneyPlus = 500000 * multiply;
    else moneyPlus = 1 * multiply;
    setWinMoney(moneyPlus);
  };

  const autoSpin = async (nr, cost, multiply) => {
    setButtonClicked(true)
    setMoney((prev) => prev - cost);
    setMultiply(multiply);
    let spinsLeft = nr;
    for (let i = 0; i < nr; i++) {
      spinsLeft--;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      spinSlotMachine();
    }
    setTimeout(() => {
      setMultiply(1);
      setButtonClicked(false)
    }, 1500);
  };

  useEffect(() => {
    if (results[0] > 0) {
      MoneyPlusHandler(intervals);
      setAddMoney(true);
    }
  }, [results]);

  useEffect(() => {
    if (addMoney) {
      setAddMoney(false);
      setMoney((prevMoney) => prevMoney + winMoney);
    }
  }, [addMoney]);
  return (
    <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md w-[360px] mx-auto">
      <div className="text-2xl font-bold text-gray-800 mb-10 flex justify-between items-center gap-5">
        {!isSpinning && winMoney ? (
          <div
            className={` z-50 ${
              winMoney > 2 ? " text-[22px] text-lime-700" : ""
            } absolute top-12 right-1/3 text-xl font-bold text-gray-800 `}
          >
            Laimėjote: {winMoney} €
          </div>
        ) : (
          ""
        )}
        <div className="text-sm">Losimas:{spins}</div>{" "}
        <div className="text-xl font-bold text-gray-800 ">{money} €</div>
      </div>

      <div
        className={`flex justify-center space-x-4 slot-machine ${
          isSpinning ? "spinning" : ""
        }`}
      >
        {intervals.map((value, index) => (
          <div key={index} className={`relative `}>
            <div
              className={`border-teal-500 w-24 h-24 border-2  border-solid rounded-full 
      ${value === 0 ? "bg-gradient-to-r from-white via-black to-white" : ""}
      ${isSpinning ? "animate-[spin_1s_ease-in-out]" : ""} ${
                intervalColors[value] || ""
              }
      transition-opacity
      `}
              style={{ animationDelay: `${index * 0.3}s` }}
            ></div>
            <div
              className={`absolute inset-0 flex items-center justify-center text-lg font-bold transition-opacity duration-5000 ease-in-out ${
                isSpinning ? "opacity-0" : "text-black"
              }`}
            >
              <span className=" text-gray-800">{value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className=" relative">
        <button
          className={` bg-blue-500 text-white px-4 py-2 rounded-md text-lg font-semibold transition duration-300 hover:bg-blue-700 mt-4 mb-10 ${
            isSpinning ? "cursor-not-allowed" : ""
          }`}
          onClick={isSpinning || multiply > 1 || buttonClicked  ? null : spinSlotMachine}
        >
          Sukti!
        </button>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-center items-center gap-5">
          <div className="flex justify-center items-center gap-4">
            <div
              onClick={money >= 10 && !isSpinning && multiply == 1  && !isSpinning && multiply == 1  && !buttonClicked ? ()   => autoSpin(5, 10, 1) : null}
              className={`w-14 h-14  border-teal-500 bg-gradient-to-r from-green-300 to-green-200 hover:cursor-pointer hover:xl hover:bg-gradient-to-r hover:from-green-300 hover:to-green-100 rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg  ${
                money >= 10 ? "" : "hover:cursor-not-allowed"
              }`}
            >
              <div
                className={`${
                  money >= 10 ? "text-gray-800" : "text-red-800  font-bold"
                }`}
              >
                <span className="text-lg">+5</span>
                <div className=" text-[8px]">-10€</div>
              </div>
            </div>

            <div
              onClick={money >= 30 && !isSpinning && multiply == 1  && !buttonClicked ? ()   => autoSpin(10, 30, 1) : null}
              className={`w-14 h-14  border-teal-500 bg-gradient-to-r from-green-300 to-green-200 hover:cursor-pointer hover:xl hover:bg-gradient-to-r hover:from-green-300 hover:to-green-100 rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg  ${
                money >= 30 ? "" : "hover:cursor-not-allowed"
              }`}
            >
              <div
                className={`${
                  money >= 30 ? "text-gray-800" : "text-red-800  font-bold"
                }`}
              >
                <span className="text-lg">+10</span>
                <div className=" text-[8px]">-30€</div>
              </div>
            </div>
            <div
              onClick={money >= 200 && !isSpinning && multiply == 1  && !buttonClicked ? ()   => autoSpin(50, 200, 1) : null}
              className={`w-14 h-14  border-teal-500 bg-gradient-to-r from-green-300 to-green-200 hover:cursor-pointer hover:xl hover:bg-gradient-to-r hover:from-green-300 hover:to-green-100 rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg  ${
                money >= 200 ? "" : "hover:cursor-not-allowed"
              }`}
            >
              <div
                className={`${
                  money >= 200 ? "text-gray-800" : "text-red-800  font-bold"
                }`}
              >
                <span className="text-lg">+50</span>
                <div className=" text-[8px]">-200€</div>
              </div>
            </div>

            <div
              onClick={money >= 500 && !isSpinning && multiply == 1  && !buttonClicked ? ()   => autoSpin(100, 500, 1) : null}
              className={`w-14 h-14  border-teal-500 bg-gradient-to-r from-green-300 to-green-200 hover:cursor-pointer hover:xl hover:bg-gradient-to-r hover:from-green-300 hover:to-green-100 rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg  ${
                money >= 500 ? "" : "hover:cursor-not-allowed"
              }`}
            >
              <div
                className={`${
                  money >= 500 ? "text-gray-800" : "text-red-800  font-bold"
                }`}
              >
                <span className="text-lg">+100</span>
                <div className=" text-[8px]">-500€</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div
            onClick={money >= 1000 && !isSpinning && multiply == 1  && !buttonClicked ? ()   => autoSpin(5, 1000, 5) : null}
            className={`w-14 h-14   bg-gradient-to-r from-blue-500 to-blue-200 hover:cursor-pointer hover:xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-100 rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg  ${
              money >= 1000 ? "" : "hover:cursor-not-allowed"
            }`}
          >
            <div
              className={`${
                money >= 1000 ? "text-gray-800" : "text-red-800  font-bold"
              }`}
            >
              <span className="text-lg">X5</span>
              <div className=" text-[8px]">-1000€</div>
            </div>
          </div>

          <div
            onClick={money >= 10000 && !isSpinning && multiply == 1  && !buttonClicked ? ()   => autoSpin(10, 10000, 10) : null}
            className={`w-14 h-14   bg-gradient-to-r from-blue-500 to-blue-200 hover:cursor-pointer hover:xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-100 rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg  ${
              money >= 10000 ? "" : "hover:cursor-not-allowed"
            }`}
          >
            <div
              className={`${
                money >= 10000 ? "text-gray-800" : "text-red-800  font-bold"
              }`}
            >
              <span className="text-lg">X10</span>
              <div className=" text-[8px]">-10 000€</div>
            </div>
          </div>

          <div
            onClick={money >= 200000 && !isSpinning && multiply == 1  && !buttonClicked ? ()   => autoSpin(50, 200000, 50) : null}
            className={`w-14 h-14   bg-gradient-to-r from-blue-500 to-blue-200 hover:cursor-pointer hover:xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-100 rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg  ${
              money >= 200000 ? "" : "hover:cursor-not-allowed"
            }`}
          >
            <div
              className={`${
                money >= 200000 ? "text-gray-800" : "text-red-800  font-bold"
              }`}
            >
              <span className="text-lg">X50</span>
              <div className=" text-[8px]">-200 000€</div>
            </div>
          </div>

          <div
            onClick={money >= 500000 && !isSpinning && multiply == 1  && !buttonClicked ? ()   => autoSpin(100, 500000, 100) : null}
            className={`w-14 h-14   bg-gradient-to-r from-blue-500 to-blue-200 hover:cursor-pointer hover:xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-100 rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg  ${
              money >= 500000 ? "" : "hover:cursor-not-allowed"
            }`}
          >
            <div
              className={`${
                money >= 500000 ? "text-gray-800" : "text-red-800  font-bold"
              }`}
            >
              <span className="text-lg">X100</span>
              <div className=" text-[8px]">-500 000€</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
