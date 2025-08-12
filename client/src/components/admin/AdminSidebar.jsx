import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import useAuthStore from "../../store/authStore";

const navItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Subjects",
    to: "/admin/subjects",
    icon: BookOpen,
  },
  {
    label: "Questions",
    to: "/admin/questions",
    icon: FileText,
  },
  {
    label: "Exams",
    to: "/admin/exams",
    icon: FileText,
  },
  {
    label: "Students",
    to: "/admin/students",
    icon: Users,
  },
  {
    label: "Results",
    to: "/admin/results",
    icon: BarChart3,
  },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: Settings,
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still navigate to login even if logout API fails
      navigate("/login");
    }
  };

  return (
    <aside className="w-64 bg-white flex flex-col h-full shadow-sm">
      {/* Logo section */}
      <div className="flex items-center border-b px-5 h-18 border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Exam Portal</h1>
      </div>

      {/* Navigation: non-scrollable */}
      <nav className="flex-1 py-4">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium cursor-pointer ${
                      isActive
                        ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                  end={item.to === "/admin/dashboard"}
                >
                  <IconComponent className="w-5 h-5" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: Logout/email */}
      <div className="p-3 border-t border-gray-200 flex items-center gap-2 h-14">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="7" r="4" />
          <path d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2" />
        </svg>
        <span className="text-xs truncate flex-1 text-gray-600">
          {user?.email || "admin@examportal.com"}
        </span>
        <button
          className="px-3 py-1.5 bg-gray-100 text-gray-700 cursor-pointer rounded-md font-medium hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200 text-xs border border-gray-200"
          onClick={handleLogout}
        >
          <LogOut className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
