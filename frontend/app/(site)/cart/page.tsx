import { NextPage } from "next";
import React from "react";
import CartContent from "./_components/CartContent";

const CartPage: NextPage = async () => {
  return (
    <div className="container mx-auto px-4 pt-40 pb-10">
      <h1 className="mb-6 text-3xl md:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-[#F86D72] via-[#ff9aa1] to-[#F86D72] bg-clip-text text-transparent">Your Cart</span>
      </h1>
      <CartContent />
    </div>
  );
};

export default CartPage;
