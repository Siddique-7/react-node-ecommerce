import { Outlet, Link, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const sidebarItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/orders", label: "Orders" },
    { path: "/admin/users", label: "Users" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        {sidebarItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <div
              className={`p-3 ${
                location.pathname === item.path ? "bg-blue-100" : ""
              }`}
            >
              {item.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;