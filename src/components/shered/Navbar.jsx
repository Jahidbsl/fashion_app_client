"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeSwitch } from "../ThemeSwitch";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const { cart } = useCart();

  // Calculate total items in the cart
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  const NAVLINKS = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Orders", href: "/orders" },
    { label: "Cart", href: "/cart" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-default-200 bg-background/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo / Name */}
        <Link
          href="/"
          className="font-bold text-xl tracking-tight text-foreground"
        >
          Fashion<span className="text-primary">Corner</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-default-600">
          {NAVLINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors flex items-center gap-2 relative group py-1"
            >
              <span>{link.label}</span>
              {link.href === "/cart" && totalCartItems > 0 && (
                <span className="inline-flex items-center justify-center bg-foreground text-background text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-sm transition-transform group-hover:scale-105">
                  {totalCartItems}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Actions & Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-4 border-l-2 pl-10 border-default-200">
          {!isPending && !session ? (
            <>
              <Link
                href="/signin"
                className="hover:text-foreground transition-colors border-2 border-default-200 rounded-2xl p-2 w-22 text-center text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="hover:text-foreground transition-colors border-2 border-default-200 rounded-2xl p-2 w-22 text-center text-sm font-medium"
              >
                Register
              </Link>
            </>
          ) : (
            <Button
              onClick={handleSignOut}
              variant="light"
              size="sm"
              className="font-medium text-default-600 border-2 border-default-200 py-2 rounded-2xl hover:text-foreground min-w-0 bg-transparent h-auto data-[hover=true]:bg-transparent"
            >
              Sign Out
            </Button>
          )}
          <ThemeSwitch />
          {!isPending && session?.user && (
            <div className="hidden lg:flex items-center gap-2 text-sm font-medium">
              <span className="text-default-500">Hi, {session.user.name}</span>
            </div>
          )}
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
                className="hover:text-foreground transition-colors py-1 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.href === "/cart" && totalCartItems > 0 && (
                  <span className="inline-flex items-center justify-center bg-foreground text-background text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalCartItems}
                  </span>
                )}
              </Link>
            ))}

            <div className="border-t border-default-200 pt-4 flex flex-col gap-3">
              {!isPending && session?.user && (
                <span className="text-default-500 py-1">
                  Hi, {session.user.name}
                </span>
              )}

              {!isPending && !session ? (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-foreground transition-colors py-1"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-foreground transition-colors py-1"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  color="danger"
                  variant="flat"
                  size="sm"
                  className="w-full justify-start"
                >
                  Sign Out
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;