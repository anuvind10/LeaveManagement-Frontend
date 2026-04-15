import { NavLink, Outlet } from "react-router-dom";
import {
  Sun,
  Moon,
  LayoutDashboard,
  ListTodo,
  PlusCircle,
  Users,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

// Each nav item has a label, path, icon, and an optional role guard
const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    managerHROnly: false,
  },
  {
    label: "My Requests",
    path: "/leave-requests/my",
    icon: ListTodo,
    managerHROnly: false,
  },
  {
    label: "Submit Request",
    path: "/leave-requests/new",
    icon: PlusCircle,
    managerHROnly: false,
  },
  {
    label: "All Requests",
    path: "/leave-requests",
    icon: Users,
    managerHROnly: true,
  },
] as const;

// Role badge colours — one per role
const ROLE_COLOURS: Record<string, string> = {
  Employee: "bg-blue-500/15 text-blue-500",
  Manager: "bg-violet-500/15 text-violet-400",
  HR: "bg-amber-500/15 text-amber-500",
};

export default function AppLayout() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();

  const isManagerOrHR = user?.role === "Manager" || user?.role === "HR";

  return (
    // Full viewport — fixed sidebar left, scrollable content right
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* ── Sidebar ── */}
      <aside className="flex w-64 flex-shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        {/* App identity */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold">
            LM
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Leave Manager
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {NAV_ITEMS.map(({ label, path, icon: Icon, managerHROnly }) => {
            // Skip manager/HR-only links for regular employees
            if (managerHROnly && !isManagerOrHR) return null;

            return (
              <NavLink
                key={path}
                to={path}
                // NavLink's className prop accepts a function that receives { isActive }
                // This lets us apply different styles depending on whether this link is the current page
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                  ].join(" ")
                }
              >
                <Icon size={16} className="shrink-0" />
                {label}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section — user info, theme toggle, logout */}
        <div className="border-t border-sidebar-border px-3 py-4 flex flex-col gap-3">
          {/* User identity */}
          <div className="flex items-center gap-3 px-3">
            {/* Avatar initials */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold uppercase">
              {user?.userName?.slice(0, 2) ?? "??"}
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium">
                {user?.userName}
              </span>
              {/* Role badge */}
              <span
                className={`w-fit rounded px-1.5 py-0.5 text-[10px] font-semibold ${ROLE_COLOURS[user?.role ?? ""] ?? ""}`}
              >
                {user?.role}
              </span>
            </div>
          </div>

          {/* Theme toggle + logout — side by side */}
          <div className="flex items-center gap-2 px-1">
            <button
              onClick={toggle}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-150"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>

            <button
              onClick={logout}
              title="Log out"
              className="flex items-center justify-center rounded-md p-2 text-sidebar-foreground/70 hover:bg-destructive/15 hover:text-destructive transition-colors duration-150"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Page content ── */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
