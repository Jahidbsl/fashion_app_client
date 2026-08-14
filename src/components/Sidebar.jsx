"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tag,
  Users,
  Menu,
  X,
  ChartBarStacked
} from "lucide-react";
import Link from "next/link";

const SIDEBAR_LINKS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Categories", href: "/admin/categories", icon: ChartBarStacked },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Discounts", href: "/admin/discounts", icon: Tag },
  { label: "Users", href: "/admin/users", icon: Users },
];

const Sidebar = () => {
  const [active, setActive] = useState(SIDEBAR_LINKS[0].href);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (href) => () => {
    setActive(href);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className="p-2 rounded-lg text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 focus:outline-none md:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 w-64 flex flex-col",
          "bg-white dark:bg-black border-r border-neutral-200 dark:border-neutral-800",
          "transition-transform duration-200 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:min-h-[calc(100vh-4rem)] md:h-auto",
        ].join(" ")}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-neutral-200 dark:border-neutral-800 md:hidden">
          <span className="font-semibold text-black dark:text-white tracking-tight">
            Menu
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 focus:outline-none"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {SIDEBAR_LINKS.map(({ label, href, icon: Icon }) => {
            const isActive = active === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={handleNavigate(href)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white",
                  isActive
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white",
                ].join(" ")}
              >
                <Icon
                  size={18}
                  className={
                    isActive
                      ? "shrink-0 text-white dark:text-black"
                      : "shrink-0 text-neutral-400 group-hover:text-black dark:text-neutral-500 dark:group-hover:text-white"
                  }
                />
                <span className="truncate">{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;