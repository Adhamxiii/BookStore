import { NextPage } from "next";
import BooksCTA from "./_components/BooksCTA";
import BooksHero from "./_components/BooksHero";
import BooksPageClient from "./_components/BooksPageClient";
import BooksShowcase from "./_components/BooksShowcase";

const BooksPage: NextPage = async () => {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  let books = [];
  let categories = [];
  let error = null;

  try {
    const [booksRes, categoriesRes] = await Promise.all([
      fetch(`${apiBase}/api/books`, { cache: "no-store" }),
      fetch(`${apiBase}/api/categories`, { cache: "no-store" }),
    ]);

    const booksData = await booksRes.json();
    const categoriesData = await categoriesRes.json();

    if (booksData.success) {
      books = booksData.data || [];
    }

    if (categoriesData.success) {
      categories = categoriesData.data || [];
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    error = "Failed to load books data";
  }

  return (
    <main className="min-h-screen">
      <BooksHero />

      <BooksShowcase books={books} categories={categories} />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <BooksPageClient books={books} categories={categories} error={error} />
      </div>

      <BooksCTA />
    </main>
  );
};

export default BooksPage;
