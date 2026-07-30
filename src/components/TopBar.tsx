import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logoSvg from "@/assets/logo.svg";
import { getButtonClassName } from "@/components/buttonStyles";
import { useAuthContext } from "@/hooks/useAuthContext";
import getInitials from "@/lib/user";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function TopBar() {
  const SMARKET_CLIENT_URL = import.meta.env.VITE_SMARKET_CLIENT_URL;
  const { token, logout } = useAuthContext();
  const { data: user, isLoading } = useCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Only listen while the menu is actually open, and use mousedown rather
  // than click so the menu closes before a click on something else underneath
  // it gets a chance to fire.
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);


  return (
    <div>
      {/* ── navbar ───────────────────────────────────────────────────────── */}
      <header
        className="flex w-full items-center justify-between gap-3 bg-white px-8 top-0 z-10 sticky"
        style={{ height: 72 }}
      >
        <img
          src={logoSvg}
          alt="Smarkets"
          className="h-6 w-auto shrink-0 sm:h-7"
          style={
            {
              "--logo-primary": "#00211F",
              "--logo-accent": "#00B073",
            } as React.CSSProperties
          }
        />

        {token ? (
          <div className="relative shrink-0" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00B073] to-[#00211F] text-xs font-semibold text-white transition hover:opacity-90 sm:h-10 sm:w-10 sm:text-sm"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Account menu"
            >
              {isLoading ? "…" : getInitials(`${user?.given_name} ${user?.family_name}`)}
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="z-[50] absolute right-0 top-full mt-2 w-54 rounded-lg border border-[#EDEDED] bg-white p-3"
              >
                <p className="truncate px-1 pb-2 text-sm font-bold text-[#00211F]">
                  {`${user?.given_name} ${user?.family_name}`}
                </p>
                <p className="truncate px-1 pb-2 text-xs font-medium text-[#00211F]">
                  {user?.email}
                </p>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="cursor-pointer flex w-full items-center gap-2 rounded-md px-1 py-2 text-sm text-red-500 transition hover:bg-[#f5f5f5] hover:text-[#00211F]"
                >
                  <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className={getButtonClassName(
                "secondary",
                "whitespace-nowrap px-3 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm"
              )}
            >
              Login
            </Link>
            <a
              href={`${SMARKET_CLIENT_URL}/members/signup/`}
              className={getButtonClassName(
                "primary",
                "whitespace-nowrap px-3 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm"
              )}
            >
              <span className="sm:hidden">Sign up</span>
              <span className="hidden sm:inline">Create Account</span>
            </a>
          </div>
        )}
      </header>
    </div>
  );
}
