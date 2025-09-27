"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  DollarSign,
  Monitor,
  ShoppingCart,
  Tag,
  BarChart3,
  Users,
  ChevronDown,
  ChevronsRight,
  Settings,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { icon: Home, title: "Home", href: "/admin" },
  { icon: ShoppingCart, title: "Add Book", href: "/admin/add-book" },
  { icon: Users, title: "Profile", href: "/admin/profile" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const selected = useMemo(() => {
    if (!pathname) return "Home";
    let match = navItems
      .filter((i) => pathname === i.href || pathname.startsWith(i.href + "/"))
      .sort((a, b) => b.href.length - a.href.length)[0];
    if (!match) {
      match = navItems.find((i) => pathname === i.href) as any;
    }
    return match?.title ?? "Home";
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out overflow-hidden ${
        open ? "w-64" : "w-18"
      } border-gray-200 bg-white p-3 shadow-sm rounded-r-3xl`}
    >
      <TitleSection open={open} />

      <div className="space-y-2 mb-8">
        {navItems.map((item) => (
          <Option
            key={item.title}
            Icon={item.icon}
            title={item.title}
            href={item.href}
            selected={selected}
            open={open}
          />
        ))}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </nav>
  );
}

function Option({ Icon, title, href, selected, open }: any) {
  const isSelected = selected === title;
  return (
    <Link
      href={href}
      className={`relative flex h-11 w-full items-center rounded-xl transition-all duration-200 overflow-hidden ${
        isSelected
          ? "relative text-[#ff5a60] shadow-sm ring-1 ring-[#ff5a60]/20 before:content-[''] before:absolute before:-left-2 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-6 before:rounded-l-full before:rounded-r-none before:bg-[#ff5a60] bg-[#ff5a60]/10"
          : "text-gray-600 hover:bg-[#ff5a60]/5 hover:text-[#ff5a60]"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      {open && (
        <span className={`text-sm font-medium transition-opacity duration-200`}>
          {title}
        </span>
      )}
    </Link>
  );
}

function TitleSection({ open }: { open: boolean }) {
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <div className="flex cursor-pointer items-center justify-between rounded-2xl p-2 transition-colors hover:bg-gray-50">
        <div className="flex items-center gap-3">
          <Logo />
          {open && (
            <div className={`transition-opacity duration-200`}>
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-gray-900">
                    BookStore Admin
                  </span>
                  <span className="block text-xs text-gray-500">Dashboard</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {open && <ChevronDown className="h-4 w-4 text-gray-400" />}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-primary to-primary-foreground shadow-sm">
      <svg
        width="20"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary-foreground"
      >
        <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
        <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
      </svg>
    </div>
  );
}

function ToggleClose({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-200 transition-colors hover:bg-gray-50"
    >
      <div className="flex items-center p-3">
        <div className="grid size-10 place-content-center">
          <ChevronsRight
            className={`h-4 w-4 transition-transform duration-300 text-gray-500 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
        {open && (
          <span
            className={`text-sm font-medium text-gray-600 transition-opacity duration-200`}
          >
            Hide
          </span>
        )}
      </div>
    </button>
  );
}
