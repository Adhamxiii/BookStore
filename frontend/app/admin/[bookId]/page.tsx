import { NextPage } from "next";
import React from "react";
import BookForm from "../_components/BookForm";

const SingleBookPage: NextPage = () => {
  return (
    <section className="">
      <div className="relative mb-8 flex items-end justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            Edit Book
          </h3>
          <p className="text-sm text-gray-600">Edit a book in your store.</p>
        </div>
      </div>

      <BookForm />
    </section>
  );
};

export default SingleBookPage;
