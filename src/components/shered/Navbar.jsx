"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeSwitch } from "../ThemeSwitch";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NAVLINKS = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-default-200 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo / Name */}
        <Link href="/" className="font-bold text-xl tracking-tight text-foreground">
          Fashion<span className="text-primary">Corner</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-default-600">
          {NAVLINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions & Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <ThemeSwitch />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-default-600 hover:text-foreground hover:bg-default-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-default-200 bg-background px-6 py-4 shadow-lg">
          <nav className="flex flex-col gap-4 text-sm font-medium text-default-600">
            {NAVLINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-foreground transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;