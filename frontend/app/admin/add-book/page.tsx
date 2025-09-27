import { NextPage } from "next";
import BookForm from "../_components/BookForm";

const AddBookPage: NextPage = () => {
  return (
    <section className="">
      <div className="relative mb-8 flex items-end justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            Add Book
          </h3>
          <p className="text-sm text-gray-600">Add a new book to your store.</p>
        </div>
      </div>

      <BookForm />
    </section>
  );
};

export default AddBookPage;
