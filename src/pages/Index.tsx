
import React from "react";
import Sidebar from "@/components/Sidebar";
import AppearanceSettings from "@/components/AppearanceSettings";
import { ColorProvider } from "@/context/ColorContext";

const Index = () => {
  return (
    <ColorProvider>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <AppearanceSettings />
        <div className="fixed top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white">
          <span>AD</span>
        </div>
      </div>
    </ColorProvider>
  );
};

export default Index;
