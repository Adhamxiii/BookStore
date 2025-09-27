"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContex";
import { Code, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const { logout, isAuthenticated, isAdmin } = useAuth();
  const { cart } = useCart();
  const pathname = usePathname();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
    ...(isAdmin ? [{ name: "Manage Dashboard", path: "/admin" }] : []),
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (cart?.items) {
      const newCount = cart.items.reduce(
        (total, item) => total + item.quantity,
        0
      );

      if (newCount !== cartItemCount && cartItemCount > 0) {
        setIsCartAnimating(true);
        setTimeout(() => setIsCartAnimating(false), 600);
      }

      setCartItemCount(newCount);
    } else {
      setCartItemCount(0);
    }
  }, [cart, cartItemCount]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 bg-[#465770] w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-1"
          : "py-4 md:py-6"
      }`}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="logo"
          width={157}
          height={40}
          className="object-contain"
          unoptimized
        />
      </Link>

      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => {
          const isActive = pathname === link.path;

          return link.path === "/admin" ? (
            <Link
              key={i}
              href={link.path}
              className={`relative group flex flex-col gap-0.5 px-4 py-1 rounded-full border-2 border-[#F86D72] bg-gradient-to-r from-[#F86D72] to-[#ffb199] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#dd6165] hover:to-[#ffb199] ${
                isScrolled ? "text-white border-[#F86D72]" : "text-white"
              }`}
              style={{
                fontWeight: 700,
                letterSpacing: "0.05em",
                boxShadow: "0 2px 16px 0 rgba(248,109,114,0.15)",
              }}
            >
              <span className="flex items-center gap-2">
                <Code className="size-5" />

                {link.name}
                <span className="ml-2 animate-pulse text-xs bg-white px-2 py-0.5 rounded-full text-[#F86D72] font-bold tracking-widest">
                  ADMIN
                </span>
              </span>
              <div
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-2/3 rounded-full bg-white/40 opacity-0 group-hover:opacity-100 transition-all duration-300`}
              />
            </Link>
          ) : (
            <Link
              key={i}
              href={link.path}
              className={`group flex flex-col gap-0.5 relative ${
                isScrolled ? "text-gray-700" : "text-white"
              } ${isActive ? "font-semibold" : ""}`}
            >
              {link.name}
              <div
                className={`${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
              {isActive && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#F86D72] rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>

      {!isAuthenticated ? (
        <div className="hidden md:flex items-center gap-4">
          <Button
            className={`px-8 py-2.5 rounded-full transition-all duration-500 ${
              isScrolled
                ? "text-white bg-[#F86D72] hover:bg-[#dd6165]"
                : "bg-white text-black hover:text-white"
            }`}
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            className={`px-8 py-2.5 rounded-full transition-all duration-500 ${
              isScrolled
                ? "text-white bg-[#F86D72] hover:bg-[#dd6165] "
                : "bg-white text-black hover:text-white"
            }`}
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-4">
          {!isAdmin && (
            <>
              <Button
                variant="ghost"
                className={`size-10 p-0 hover:bg-transparent hover:text-[#F86D72] transition-all duration-500 rounded-full cursor-pointer flex items-center justify-center relative ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart
                  className={`size-6 transition-all duration-300 ${
                    isCartAnimating ? "scale-125 rotate-12 text-[#F86D72]" : ""
                  }`}
                />

                {isCartAnimating && (
                  <div className="absolute inset-0 border-2 border-[#F86D72] rounded-full animate-ping opacity-75" />
                )}
              </Button>
            </>
          )}
          <Button
            variant="primary"
            onClick={async () => {
              await logout();
              router.push("/");
            }}
          >
            Logout
          </Button>
        </div>
      )}

      <div className="flex items-center gap-3 md:hidden">
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={i}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`relative transition-all duration-300 ${
                isActive
                  ? "text-[#F86D72] font-semibold"
                  : "text-gray-800 hover:text-[#F86D72]"
              }`}
            >
              {link.name}
              {isActive && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#F86D72] rounded-full" />
              )}
            </Link>
          );
        })}

        {!isAuthenticated ? (
          <>
            <button
              className="bg-[#F86D72] text-white px-8 py-2.5 rounded-full transition-all duration-500"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className="bg-[#F86D72] text-white px-8 py-2.5 rounded-full transition-all duration-500"
              onClick={() => router.push("/register")}
            >
              Register
            </button>{" "}
          </>
        ) : (
          <button
            className="bg-[#F86D72] text-white px-8 py-2.5 rounded-full transition-all duration-500"
            onClick={async () => {
              await logout();
              router.push("/");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
