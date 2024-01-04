"use client";
import { useEffect, useState } from "react";

const Page2 = () => {
  const [results, setResults] = useState(["", "", ""]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [intervals, setIntervals] = useState(["0", "0", "0"]);
  const [money, setMoney] = useState(0);
  const [winMoney, setWinMoney] = useState(0);
  const [addMoney, setAddMoney] = useState(false);

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

    const newResults = Array.from(
      { length: 3 },
      () => Math.floor(Math.random() * 99) + 1
    );

    setTimeout(() => {
      setIsSpinning(false);
      setResults(newResults);
      setIntervals(newResults.map(checkIntervals));
      MoneyPlusHandler(newResults);
    }, 500);
  };

  const MoneyPlusHandler = (newResults) => {
    let moneyPlus = null;
    if (newResults.every((value) => value === "Normal")) moneyPlus = 10;
    else if (newResults.every((value) => value === "Rare")) moneyPlus = 50;
    else if (newResults.every((value) => value === "Blue")) moneyPlus = 200;
    else if (newResults.every((value) => value === "Gold")) moneyPlus = 1000;
    else if (newResults.every((value) => value === "Platina"))
      moneyPlus = 20000;
    else if (newResults.every((value) => value === "Nova")) moneyPlus = 500000;
    else moneyPlus = 1;

    setWinMoney(moneyPlus);
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
      <div className="text-2xl font-bold text-gray-800 mb-4 flex justify-between gap-5">
        <div>Losimas:</div>{" "}
        <div className="text-xl font-bold text-gray-800 ">{money} €</div>
      </div>

      <div
        className={`flex justify-center space-x-4 slot-machine ${
          isSpinning ? "spinning" : ""
        }`}
      >
        {intervals.map((value, index) => (
          <div key={index} className="relative">
            <div
              className={`border-teal-500 w-24 h-24 border-t-4 border-b-4 border-solid rounded-full ${
                isSpinning ? "animate-spin" : ""
              } ${intervalColors[value] || ""}`}
            ></div>
            <div
              className={`absolute inset-0 flex items-center justify-center text-lg font-bold  transition-colors duration-500 ease-in-out ${
                isSpinning ? " text-transparent" : " text-black"
              }`}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
      <div className=" relative">
        <button
          className={` bg-blue-500 text-white px-4 py-2 rounded-md text-lg font-semibold transition duration-300 hover:bg-blue-700 mt-4 mb-10 ${
            isSpinning ? "cursor-not-allowed" : ""
          }`}
          onClick={isSpinning ? null : spinSlotMachine}
        >
          Sukti!
        </button>
        {!isSpinning && winMoney ? (
          <div className=" absolute inset-16 text-xl font-bold text-gray-800 mt-4">
            Laimėjote: {winMoney} €
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Page2;
