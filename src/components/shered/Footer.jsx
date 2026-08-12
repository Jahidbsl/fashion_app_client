import React from "react";
import Link from "next/link";
import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialInstagram,
} from "react-icons/ti";

import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const QUICK_LINKS = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About Us", href: "/about" },
  ];

  const SUPPORT_LINKS = [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ];

  const SOCIAL_LINKS = [
    { label: "Facebook", href: "#", icon: TiSocialFacebook },
    { label: "Instagram", href: "#", icon: TiSocialInstagram },
    { label: "Twitter", href: "#", icon: TiSocialTwitter },
  ];

  const CONTACT_INFO = [
    { icon: MapPin, text: "123 Fashion Street, Style City, BC 45678" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "support@fashioncorner.com" },
  ];

  return (
    <footer className="w-full border-t border-default-200 bg-background text-default-600">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-bold text-xl tracking-tight text-foreground"
            >
              Fashion<span className="text-primary">Corner</span>
            </Link>
            <p className="text-sm text-default-500">
              Your ultimate destination for trendy and high-quality fashion
              wear. Elevate your style with our exclusive collections.
            </p>
            <div className="flex items-center gap-4 text-default-600">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-full border border-default-200 hover:border-primary hover:text-primary transition-colors"
                  >
                    <IconComponent className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground text-sm tracking-wide uppercase">
              Quick Links
            </h3>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 3: Customer Support */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground text-sm tracking-wide uppercase">
              Support
            </h3>
            {SUPPORT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground text-sm tracking-wide uppercase">
              Contact Us
            </h3>
            {CONTACT_INFO.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-2 text-sm text-default-500"
                >
                  <IconComponent className="size-4 mt-0.5 shrink-0 text-primary" />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-default-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-default-500">
          <p>
            © {new Date().getFullYear()} FashionCorner. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
