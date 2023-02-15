import React from "react";

export default function KarrotPay() {
  return (
    <div className="h-auto p-4 border-2 border-gray-100 rounded-lg">
      <div className="flex items-center ">
        <div>logo!</div>
        <span className="ml-2 text-lg ">0원</span>
        <span className="ml-auto ">{">"}</span>
      </div>
      <div className="flex mt-6 space-x-5 ">
        <button className="items-center w-full h-10 bg-gray-100 rounded-md justify-items-center">
          + 충전
        </button>
        <button className="w-full h-10 bg-gray-100 rounded-md">
          $ 계좌송금
        </button>
      </div>
    </div>
  );
}
