import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import planpalLogo from "../assets/planpal-logo.svg";
import {
  HamburgerIcon,
  XIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  HomeIcon,
  RestaurantIcon,
  MovieIcon,
  TempleIcon,
  BeachIcon,
  WaterfallIcon,
  ParkIcon,
  TripIcon,
  ProfileIcon,
  SettingsIcon,
  CreateIcon,
} from "./Icons";

export default function Navbar({
  user,
  setUser,
  setAuthModalOpen,
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  setDarkMode,
}) {
  const sidebarRef = useRef(null);
  const profileRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Sections
  const sections = [
    { key: "home", label: "Home", path: "/", icon: () => <HomeIcon className="h-5 w-5" /> },
    { key: "restaurants", label: "Restaurants", path: "/restaurants", icon: () => <RestaurantIcon className="h-5 w-5" /> },
    { key: "movies", label: "Movies", path: "/movies", icon: () => <MovieIcon className="h-5 w-5" /> },
    { key: "temples", label: "Temples", path: "/temples", icon: () => <TempleIcon className="h-5 w-5" /> },
    { key: "beaches", label: "Beaches", path: "/beaches", icon: () => <BeachIcon className="h-5 w-5" /> },
    { key: "waterfalls", label: "Waterfalls", path: "/waterfalls", icon: () => <WaterfallIcon className="h-5 w-5" /> },
    { key: "parks", label: "Parks", path: "/parks", icon: () => <ParkIcon className="h-5 w-5" /> },
  ];

  // User routes
  const routes = [
    { key: "profile", label: "Profile", path: "/profile", icon: () => <ProfileIcon className="h-5 w-5" /> },
    { key: "settings", label: "Settings", path: "/settings", icon: () => <SettingsIcon className="h-5 w-5" /> },
    { key: "mytrip", label: "My Trips", path: "/mytrip", icon: () => <TripIcon className="h-5 w-5" /> },
    { key: "create", label: "Create Group", path: "/create", icon: () => <CreateIcon className="h-5 w-5" /> },
    { key: "myevents", label: "My Events", path: "/myevents", icon: () => <TripIcon className="h-5 w-5" /> },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
    setProfileOpen(false);
  };

  const handleProtectedNavigation = (path) => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      handleNavigation(path);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setProfileOpen(false);
    setSidebarOpen(false);
    navigate("/");
  };

  const bgColor = darkMode ? "#1f2937" : "#f0f4f8";

  // Auto close sidebar & profile
  useEffect(() => {
    const handleClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) setSidebarOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <header
        className="fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-8 py-3 border-b z-40"
        style={{ background: bgColor, color: darkMode ? "white" : "black" }}
      >
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            <HamburgerIcon className="h-6 w-6" />
          </button>
          <button onClick={() => handleNavigation("/home")} className="flex items-center gap-3">
            <img src={planpalLogo} className="h-9 w-9 rounded-full" alt="PlanPal Logo" />
            <span className="font-semibold text-xl">Roamly</span>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 relative">
          <div className="hidden md:block">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full">
              {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          </div>

          {!user ? (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-3 py-1.5 rounded-md flex items-center gap-2"
            >
              <UserIcon className="h-5 w-5" /> Sign In
            </button>
          ) : (
            <>
              {/* Desktop Top Nav Buttons */}
              <div className="hidden md:flex gap-2">
                {routes
                  .filter((x) => ["create", "mytrip", "myevents"].includes(x.key))
                  .map((r) => (
                    <button
                      key={r.key}
                      onClick={() => handleProtectedNavigation(r.path)}
                      className="px-3 py-1.5 rounded-md flex items-center gap-2"
                      style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                    >
                      {r.icon()} {r.label}
                    </button>
                  ))}
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="px-3 py-1.5 rounded-full border"
                >
                  <UserIcon className="h-5 w-5" />
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded shadow-lg overflow-hidden z-50"
                    style={{ background: bgColor }}
                  >
                    {routes
                      .filter((x) => ["profile", "settings"].includes(x.key))
                      .map((x) => (
                        <button
                          key={x.key}
                          onClick={() => handleProtectedNavigation(x.path)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          {x.icon()} {x.label}
                        </button>
                      ))}

                    {/* Mobile Dark Mode Toggle */}
                    <div className="block md:hidden">
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                        {darkMode ? "Light Mode" : "Dark Mode"}
                      </button>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-30 transition-opacity ${
          sidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div onClick={() => setSidebarOpen(false)} className="absolute inset-0 bg-black opacity-50" />
        <aside
          ref={sidebarRef}
          className={`absolute left-0 top-0 h-full w-72 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform shadow-xl`}
          style={{ background: bgColor }}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <div className="font-semibold text-lg">Menu</div>
            <button onClick={() => setSidebarOpen(false)} className="p-2">
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => handleNavigation(s.path)}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                {s.icon()} {s.label}
              </button>
            ))}

            {user &&
              routes.map((r) => (
                <button
                  key={r.key}
                  onClick={() => handleProtectedNavigation(r.path)}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  {r.icon()} {r.label}
                </button>
              ))}
          </nav>
        </aside>
      </div>
    </>
  );
}



