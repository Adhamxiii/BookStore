import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Category from "./models/CategorySchema.js";
import Book from "./models/BookSchema.js";

dotenv.config();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const sampleAuthors = [
  "Harper Lee",
  "George Orwell",
  "Jane Austen",
  "Mark Twain",
  "J.K. Rowling",
  "J.R.R. Tolkien",
  "Agatha Christie",
  "Ernest Hemingway",
  "F. Scott Fitzgerald",
  "Isaac Asimov",
];

const sampleWords = [
  "Shadow",
  "Whisper",
  "Echo",
  "Secret",
  "Storm",
  "Dream",
  "Fire",
  "Ice",
  "Light",
  "Night",
  "Silence",
  "Promise",
  "Memory",
  "Garden",
  "River",
  "Sky",
  "Stone",
  "Voyage",
  "Code",
  "Quantum",
];

function generateTitle() {
  const parts = getRandomInt(2, 3);
  let title = [];
  for (let i = 0; i < parts; i++) {
    title.push(pickRandom(sampleWords));
  }
  return title.join(" ");
}

function generateDescription() {
  const sentences = getRandomInt(2, 4);
  const sentence = () =>
    `A ${pickRandom(sampleWords).toLowerCase()} of ${pickRandom(sampleWords).toLowerCase()} and ${pickRandom(
      sampleWords
    ).toLowerCase()} unfolds.`;
  return Array.from({ length: sentences })
    .map(sentence)
    .join(" ");
}

async function seed() {
  try {
    await connectDB();

    console.log("Clearing existing data...");
    await Promise.all([Book.deleteMany({}), Category.deleteMany({})]);

    const categoryNames = [
      "Fiction",
      "Non-Fiction",
      "Science",
      "History",
      "Fantasy",
    ];

    console.log("Creating categories...");
    const categories = await Category.insertMany(
      categoryNames.map((name) => ({ name }))
    );

    console.log("Creating books...");
    const booksToCreate = 20;
    const books = [];
    for (let i = 0; i < booksToCreate; i++) {
      const isOnSale = Math.random() < 0.3;
      const discountPercent = isOnSale ? `${getRandomInt(5, 40)}` : "0";
      books.push({
        title: generateTitle(),
        author: pickRandom(sampleAuthors),
        description: generateDescription(),
        price: parseFloat((Math.random() * 40 + 5).toFixed(2)),
        stock: getRandomInt(0, 100),
        isFeatured: Math.random() < 0.2,
        isOnSale,
        discountPercent,
        coverImage: "", // optional; can be set later
        category: pickRandom(categories)._id,
      });
    }

    await Book.insertMany(books);

    console.log(
      `Seed completed: ${categories.length} categories and ${books.length} books inserted.`
    );
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

seed();


