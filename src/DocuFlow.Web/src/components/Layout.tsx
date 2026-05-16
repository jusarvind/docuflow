import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import { logout } from "../api/auth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      signOut();
      navigate("/login");
    }
  };

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const navLinkClass = (to: string) =>
    `text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
      isActive(to)
        ? "bg-blue-50 text-blue-700 font-semibold"
        : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
    }`;

  const mobileNavLinkClass = (to: string) =>
    `block text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
      isActive(to)
        ? "bg-blue-50 text-blue-700 font-semibold"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-xs font-bold text-white">D</span>
            </div>
            <span className="text-lg font-bold text-gray-900">DocuFlow</span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {["/", "/documents", "/about"].map((to) => (
              <Link key={to} to={to} className={navLinkClass(to)}>
                {to === "/"
                  ? "Dashboard"
                  : to === "/documents"
                    ? "Documents"
                    : "About"}
              </Link>
            ))}
          </div>

          {/* Desktop user + sign out */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium">
              {user?.fullName}
            </span>
            <div className="w-px h-4 bg-gray-300" />
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-red-600 font-medium transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-gray-600 rounded transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-600 rounded transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-600 rounded transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 pb-4">
            {[
              { to: "/", label: "Dashboard" },
              { to: "/documents", label: "Documents" },
              { to: "/about", label: "About" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={mobileNavLinkClass(to)}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            <div className="border-t border-gray-100 mt-2 pt-3 flex items-center justify-between px-4">
              <span className="text-sm text-gray-600 font-medium">
                {user?.fullName}
              </span>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
