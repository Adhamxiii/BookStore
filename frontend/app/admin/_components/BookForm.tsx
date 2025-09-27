"use client";

import { Category } from "@/types/book";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookForm = () => {
  const params = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const bookId = params?.bookId as string;
  const isEditMode = Boolean(bookId);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [loadingBook, setLoadingBook] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    discountPercent: "0",
    isFeatured: false,
    isOnSale: false,
    coverImage: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCats(true);
        const apiBase =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${apiBase}/api/categories`);
        const data = await res.json();
        setCategories(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCats(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEditMode && bookId) {
      const fetchBook = async () => {
        try {
          setLoadingBook(true);
          const apiBase =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
          const res = await fetch(`${apiBase}/api/books/${bookId}`);
          const data = await res.json();
          if (data.success && data.data) {
            const book = data.data;
            setForm({
              title: book.title || "",
              author: book.author || "",
              description: book.description || "",
              price: book.price || 0,
              stock: book.stock || 0,
              category: book.category?._id || "",
              discountPercent: String(book.discountPercent || 0),
              isFeatured: Boolean(book.isFeatured),
              isOnSale: Boolean(book.isOnSale),
              coverImage: null,
            });
            if (book.coverImage) {
              setPreview(
                book.coverImage?.startsWith("https")
                  ? book.coverImage
                  : `${apiBase}/images/${book.coverImage}`
              );
            }
          }
        } catch (error) {
          console.log(error);
          setMsg("Failed to load book data");
        } finally {
          setLoadingBook(false);
        }
      };
      fetchBook();
    }
  }, [isEditMode, bookId]);

  const onChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files?.[0] || null;
      setForm((p) => ({ ...p, [name]: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
      return;
    }

    if (type === "checkbox") {
      setForm((p) => ({ ...p, [name]: checked }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);

    if (
      !form.title ||
      !form.author ||
      !form.description ||
      !form.price ||
      !form.stock
    ) {
      setMsg(
        `❌ All fields are (${
          !form.title
            ? "title"
            : !form.author
            ? "author"
            : !form.description
            ? "description"
            : !form.price
            ? "price"
            : "stock"
        }) required.`
      );
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("author", form.author);
    fd.append("description", form.description);
    fd.append("price", form.price.toString());
    fd.append("stock", form.stock.toString());
    if (form.category) {
      fd.append("category", form.category);
    }
    fd.append("discountPercent", form.discountPercent);
    fd.append("isFeatured", form.isFeatured.toString());
    fd.append("isOnSale", form.isOnSale.toString());
    if (form.coverImage) {
      fd.append("coverImage", form.coverImage);
    }

    try {
      setSubmitting(true);
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const url = isEditMode
        ? `${apiBase}/api/books/${bookId}`
        : `${apiBase}/api/books`;
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setMsg(`✅ ${data.message}`);
        if (isEditMode) {
          setTimeout(() => {
            router.push("/admin");
          }, 1500);
        }
      } else {
        setMsg(`❌ ${data.message}`);
      }
      if (!isEditMode) {
        setForm({
          title: "",
          author: "",
          description: "",
          price: 0,
          stock: 0,
          category: "",
          discountPercent: "0",
          isFeatured: false,
          isOnSale: false,
          coverImage: null,
        });
        setPreview(null);
        setMsg(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm"
    >
      <div className="space-y-1">
        <h3 className="text-xl font-semibold tracking-tight">
          {isEditMode ? "Edit Book" : "Add a new book"}
        </h3>
        <p className="text-sm text-gray-600">
          {isEditMode
            ? "Update the book information below."
            : "Fill the form below to add a product to your store."}
        </p>
      </div>

      {loadingBook && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-600">Loading book data...</p>
        </div>
      )}

      {!loadingBook && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm mb-1 text-gray-700" htmlFor="title">
                Title *
              </Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Book title"
                required
              />
            </div>

            <div>
              <Label className="text-sm mb-1 text-gray-700" htmlFor="author">
                Author *
              </Label>
              <Input
                id="author"
                name="author"
                value={form.author}
                onChange={onChange}
                placeholder="Author name"
                required
              />
            </div>

            <div>
              <Label className="text-sm mb-1 text-gray-700" htmlFor="price">
                Price *
              </Label>
              <Input
                id="price"
                type="number"
                name="price"
                min={0}
                step={0.01}
                value={form.price}
                onChange={onChange}
                placeholder="e.g. 19.99"
                required
              />
            </div>

            <div>
              <Label className="text-sm mb-1 text-gray-700" htmlFor="stock">
                Stock *
              </Label>
              <Input
                id="stock"
                type="number"
                name="stock"
                min={0}
                step={1}
                value={form.stock}
                onChange={onChange}
                placeholder="e.g. 20"
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label
                className="text-sm mb-1 text-gray-700"
                htmlFor="description"
              >
                Description *
              </Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={onChange}
                rows={5}
                placeholder="Write a short description..."
                className="rounded-[12px] shadow-[2px_2px_0px_0px_hsl(0_0%_0%_/_1)]"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Keep it concise and informative (max a few sentences).
              </p>
            </div>

            <div>
              <Label className="text-sm mb-1 text-gray-700">Category</Label>
              <Select
                value={form.category}
                onValueChange={(val) =>
                  setForm((p) => ({ ...p, category: val }))
                }
                disabled={loadingCats}
              >
                <SelectTrigger className="rounded-[12px] shadow-[2px_2px_0px_0px_hsl(0_0%_0%_/_1)] w-full">
                  <SelectValue
                    placeholder={loadingCats ? "Loading..." : "Select category"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block text-sm mb-1 text-gray-700">
                Discount Percent
              </Label>
              <Input
                id="discountPercent"
                name="discountPercent"
                min="0"
                max="100"
                step="1"
                value={form.discountPercent}
                onChange={onChange}
                className="w-full rounded-[12px] shadow-[2px_2px_0px_0px_hsl(0_0%_0%_/_1)]"
                placeholder="e.g. 10"
              />
            </div>

            <div className="flex items-center gap-6 md:col-span-2">
              <div className="inline-flex items-center gap-2">
                <Checkbox
                  id="isFeatured"
                  checked={form.isFeatured}
                  onCheckedChange={(v: boolean) =>
                    setForm((p) => ({ ...p, isFeatured: !!v }))
                  }
                  className="shadow-[2px_2px_0px_0px_hsl(0_0%_0%_/_1)]"
                />
                <Label htmlFor="isFeatured" className="text-sm">
                  Featured
                </Label>
              </div>

              <div className="inline-flex items-center gap-2">
                <Checkbox
                  id="isOnSale"
                  checked={form.isOnSale}
                  onCheckedChange={(v: boolean) =>
                    setForm((p) => ({ ...p, isOnSale: !!v }))
                  }
                  className="shadow-[2px_2px_0px_0px_hsl(0_0%_0%_/_1)]"
                />
                <Label htmlFor="isOnSale" className="text-sm">
                  On Sale
                </Label>
              </div>
            </div>

            <div className="md:col-span-2">
              <Label
                className="text-sm mb-1 text-gray-700"
                htmlFor="coverImage"
              >
                Cover Image
              </Label>
              <input
                type="file"
                name="coverImage"
                id="coverImage"
                accept="image/*"
                onChange={onChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ff5a60]/10 file:text-[#ff5a60] hover:file:bg-[#ff5a60]/20"
              />

              {/* Preview */}
              {preview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <Image
                    src={preview}
                    alt="preview"
                    width={160}
                    height={160}
                    className="h-40 w-40 object-cover rounded-xl border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center whitespace-nowrap justify-center rounded-full bg-[#ff5a60] text-white px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-[#ff5a60]/90 disabled:opacity-60"
          >
            {submitting
              ? "Submitting..."
              : isEditMode
              ? "Update Book"
              : "Create Book"}
          </button>
        </>
      )}

      {msg && <p className="text-sm mt-2">{msg}</p>}
    </form>
  );
};

export default BookForm;
