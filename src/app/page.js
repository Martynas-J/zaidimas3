"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [plius, setPlius] = useState(1);
  const [animate, setAnimate] = useState(false);

  const suktis = () => {
    setPlius((prev) => prev + 1);
    console.log("sudėtis :" + plius);
    setAnimate(true);
  };

  return (
    <div className="py-10 container mx-auto">
      <Link href="/page2">Page2</Link>
      <p>{plius}</p>
      <div className=" bg-orange-400 flex gap-5 p-5">
        <div
          className={`w-40 h-40 bg-red-300 rounded-3xl ${
            animate ? "animate-slide-down" : ""
          }`}
        ></div>
        <div className=" w-40 h-40 bg-blue-300 rounded-3xl"></div>
        <div className=" w-40 h-40 bg-green-300 rounded-3xl"></div>
      </div>
      <button
        className="bg-blue-500 rounded-md px-5 py-2 mt-5 text-white hover:text-black hover:bg-blue-200"
        onClick={suktis}
      >
        Click
      </button>
    </div>
  );
}
