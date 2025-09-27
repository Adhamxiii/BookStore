import { NextPage } from "next";
import { notFound } from "next/navigation";
import BookDetailsHero from "./_components/BookDetailsHero";
import BookInfo from "./_components/BookInfo";
import BookGallery from "./_components/BookGallery";
import BookReviews from "./_components/BookReviews";
import RelatedBooks from "./_components/RelatedBooks";
import BookPageClient from "./_components/BookPageClient";

interface BookDetailsPageProps {
  params: {
    bookId: string;
  };
}

const BookDetailsPage: NextPage<BookDetailsPageProps> = async ({ params }) => {
  const { bookId } = params;
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  let book: any = null;
  let relatedBooks: any[] = [];
  let error: string | null = null;

  try {
    const [bookRes, booksRes] = await Promise.all([
      fetch(`${apiBase}/api/books/${bookId}`, { cache: "no-store" }),
      fetch(`${apiBase}/api/books`, { cache: "no-store" })
    ]);

    if (!bookRes.ok) {
      notFound();
    }

    const bookData = await bookRes.json();
    const booksData = await booksRes.json();

    if (bookData.success) {
      book = bookData.data;
    }

    if (booksData.success) {
      relatedBooks = (booksData.data || [])
        .filter((b: any) => b._id !== bookId && b.category?._id === book?.category?._id)
        .slice(0, 4);
    }
  } catch (err) {
    console.error("Error fetching book data:", err);
    error = "Failed to load book details";
  }

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <BookDetailsHero book={book} />
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <BookGallery book={book} />
          <BookInfo book={book} />
        </div>
        
        <BookReviews book={book} />
        
        <BookPageClient book={book} relatedBooks={relatedBooks} error={error} />
        
        <RelatedBooks relatedBooks={relatedBooks} />
      </div>
    </main>
  );
};

export default BookDetailsPage;
