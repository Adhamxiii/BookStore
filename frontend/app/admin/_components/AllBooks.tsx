"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Book } from "@/types/book";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

const AllBooks = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const router = useRouter();
  const { token } = useAuth();
  useEffect(() => {
    fetch(`${apiBase}/api/books`)
      .then((res) => res.json())
      .then((data) => setBookList(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [apiBase]);

  const handleDeleteBook = async (bookId: string) => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    setDeletingId(bookId);
    try {
      const res = await fetch(`${apiBase}/api/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Optimistic update - remove book from list immediately
        setBookList((prev) => prev.filter((book) => book._id !== bookId));
        toast.success("Book deleted successfully");
        setOpenDialog(null);
      } else {
        toast.error(data.message || "Failed to delete book");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete book");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="">
      <div className="relative mb-8 flex items-end justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            All Books
          </h3>
          <p className="text-sm text-gray-600">
            Manage all books in your store.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="relative w-full aspect-[4/3] rounded-xl bg-gray-100 animate-pulse" />
              <div className="mt-4 h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
              <div className="mt-2 h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
              <div className="mt-4 h-8 w-full bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : bookList.length === 0 ? (
        <div className="text-center py-16 border rounded-2xl bg-white">
          <p className="text-gray-600">
            No books yet. Start by adding a new book.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookList.map((book) => {
            const isOnSale = Boolean(book?.isOnSale);
            const discountPercent =
              parseFloat(String(book?.discountPercent || 0)) || 0;
            const price = Number(book?.price || 0);
            const discounted =
              isOnSale && discountPercent > 0
                ? Number((price * (1 - discountPercent / 100)).toFixed(2))
                : price;

            return (
              <div
                key={book?._id}
                className="group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="absolute left-3 top-3 z-10 flex gap-2">
                  {isOnSale && (
                    <span className="rounded-full bg-[#ff5a60]/10 text-[#ff5a60] px-3 py-1 text-xs font-medium">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-50">
                  {book?.coverImage && (
                    <Image
                      src={
                        book?.coverImage?.startsWith("https")
                          ? book.coverImage
                          : `${apiBase}/images/${book?.coverImage}`
                      }
                      alt={book?.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {!book?.coverImage && (
                    <div className="w-full h-full bg-gray-50" />
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="line-clamp-1 text-base font-semibold">
                    {book?.title}
                  </h4>
                  <p className="line-clamp-1 text-sm text-gray-600">
                    {book?.author}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="truncate">
                      {book?.category?.name ?? "Uncategorized"}
                    </span>
                    <span>Stock: {book?.stock ?? 0}</span>
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-lg font-semibold text-[#ff5a60]">
                      ${discounted}
                    </span>
                    {isOnSale && (
                      <span className="text-sm text-gray-500 line-through">
                        ${price}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button
                    className="w-full rounded-full bg-white text-[#ff5a60] border border-[#ff5a60]/30 hover:bg-[#ff5a60]/10 cursor-pointer"
                    onClick={() => router.push(`/admin/${book?._id}`)}
                  >
                    Edit
                  </Button>

                  <Dialog
                    open={openDialog === book?._id}
                    onOpenChange={(open) =>
                      setOpenDialog(open ? book?._id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="primary"
                        className="w-full rounded-full hover:bg-red-500 text-white"
                        disabled={deletingId === book?._id}
                      >
                        {deletingId === book?._id ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Deleting...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">Delete</div>
                        )}
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                      <DialogHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <DialogTitle className="text-xl font-semibold text-gray-900">
                          Delete Book
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                          Are you sure you want to delete{" "}
                          <span className="font-semibold text-gray-900">
                            &quot;{book?.title}&quot;
                          </span>
                          ? This action cannot be undone and will permanently
                          remove the book from your store.
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setOpenDialog(null)}
                          className="w-full sm:w-auto rounded-xl"
                          disabled={deletingId === book?._id}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => handleDeleteBook(book?._id)}
                          disabled={deletingId === book?._id}
                          className="w-full sm:w-auto hover:bg-red-500 rounded-xl"
                        >
                          {deletingId === book?._id ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Deleting...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              Delete Book
                            </div>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AllBooks;
