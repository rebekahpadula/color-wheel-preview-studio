
import React from "react";
import { useColors } from "@/context/ColorContext";
import { ChevronLeft } from "lucide-react";

const menuItems = [
  { name: "General", active: false },
  { name: "Plan & Billing", active: false },
  { name: "Usage", active: false },
  { name: "Users & Authentication", active: false },
  { name: "Guest Access", active: false },
  { name: "Appearance", active: true },
  { name: "Email Domains", active: false },
  { name: "Integrations", active: false },
  { name: "Referral Program", active: false },
  { name: "Preview Features", active: false }
];

const Sidebar: React.FC = () => {
  const { useSystemFont } = useColors();
  
  return (
    <div className="w-64 bg-gray-50 min-h-screen border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-700">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className={useSystemFont ? "font-system" : ""}>
            <h2 className="text-lg font-medium">Acme Widgets</h2>
            <p className="text-sm text-gray-500">Settings</p>
          </div>
        </div>
      </div>
      <nav className="p-2">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`block px-4 py-2 rounded ${
                  item.active
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
