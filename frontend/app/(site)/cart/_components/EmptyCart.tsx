"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const EmptyCart = () => {
  return (
    <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
      <h3 className="text-xl font-semibold">Your cart is empty</h3>
      <p className="mt-2 text-gray-600">Browse our collection and add some books.</p>
      <Button asChild className="mt-6">
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
};

export default EmptyCart;


